import contentsActionTypes from "./contentsActionTypes";

const contentsReducer = (state, action) => {
  switch (action.type) {
    case contentsActionTypes.ADD_CONTENT:
      return {
        ...state,
        contents: [action.payload, ...state.contents],
      };
    case contentsActionTypes.EDIT_CONTENT:
      return {
        ...state,
        contents: state.contents.map((content) =>
          content.id === action.payload.id
            ? action.payload.updatedContent
            : content
        ),
      };
    case contentsActionTypes.DELETE_CONTENT_START:
      return {
        ...state,
        contentIdToDelete: action.payload,
        showDeleteContentConfirmationModal: true,
      };
    case contentsActionTypes.DELETE_CONTENT_FINISH:
      return {
        ...state,
        contents: state.Contents.filter(
          (content) => content.id !== state.contentIdToDelete
        ),
        contentIdToDelete: null,
        showDeleteContentConfirmationModal: false,
      };
    case contentsActionTypes.DELETE_CONTENT_CANCEL:
      return {
        ...state,
        contentIdToDelete: null,
        showDeleteContentConfirmationModal: false,
      };
    case contentsActionTypes.SET_CONTENTS:
      return {
        ...state,
        contents: action.payload,
      };
    case contentsActionTypes.SET_SELECTED_CONTENT:
      return {
        ...state,
        selectedContent: action.payload,
      };
    case contentsActionTypes.RESET_SELECTED_CONTENT:
      return {
        ...state,
        selectedContent: null,
      };
    case contentsActionTypes.RESET_CONTENTS:
      return {
        ...state,
        contents: [],
      };
    case contentsActionTypes.RESET_FILTERED_CONTENTS:
      return {
        ...state,
        contents: [],
      };
    default:
      return state;
  }
};

export default contentsReducer;
