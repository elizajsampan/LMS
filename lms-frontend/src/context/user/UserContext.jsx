import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../auth/AuthContext";
import {
  deleteUserCancel,
  deleteUserFinish,
  deleteUserStart,
  setUsers,
} from "./userActions";
import userReducer from "./userReducer";

export const UserContext = createContext({
  users: [],
  loading: false,
  fetchAllUsers: () => {},
  handleDeleteUserConfirmationModalClose: () => {},
  handleDeleteUserStart: () => {},
  showDeleteUserConfirmationModal: false,
});

export const UserProvider = ({ children }) => {
  const initialState = {
    users: [],
    showDeleteUserConfirmationModal: false,
    userIdToDelete: null,
  };

  const http = useHttp();

  const [{ users, showDeleteUserConfirmationModal, userIdToDelete }, dispatch] =
    useReducer(userReducer, initialState);

  useEffect(() => {
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
    } else dispatch(setUsers(JSON.parse(localStorage.getItem("users"))));
  }, [users]);

  const [loading, setLoading] = useState(false);
  const { authToken } = useContext(AuthContext);

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    const response = await http.get("/users", {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    setLoading(false);
    dispatch(setUsers(response.data));
  }, [http, authToken]);

  const handleDeleteUserConfirmationModalClose = async (toContinueDeleting) => {
    if (toContinueDeleting) {
      await http.delete(`/user/delete/${userIdToDelete}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(deleteUserFinish());
    } else {
      dispatch(deleteUserCancel());
    }
  };

  const handleDeleteUserStart = (userIdToDelete) => {
    dispatch(deleteUserStart(userIdToDelete));
  };

  return (
    <UserContext.Provider
      value={{
        users,
        userIdToDelete,
        fetchAllUsers,
        loading,
        handleDeleteUserConfirmationModalClose,
        handleDeleteUserStart,
        showDeleteUserConfirmationModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
