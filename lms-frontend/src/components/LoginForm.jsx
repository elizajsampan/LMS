import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Box,
  Paper,
  InputAdornment,
  IconButton,
  // FormHelperText,
  Avatar,
} from "@mui/material";
import { useState, useContext } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../assets/logo.png";

const LoginForm = () => {
  const navigate = useNavigate();

  const defaultFormValue = {
    username: "",
    password: "",
  };

  // const schema = Joi.object({
  //   username: Joi.string().required(),
  //   password: Joi.string().required(),
  // });

  const [form, setForm] = useState(defaultFormValue);
  // const [errors, setErrors] = useState({});
  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);

  // Password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  // const isFormInvalid = () => {
  //   const { id, ...otherFields } = form;
  //   const { error } = schema.validate(otherFields);

  //   return !!error;
  // };

  const handleChange = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    // const { error } = schema
    //   .extract(input.name)
    //   .label(input.name)
    //   .validate(input.value);

    // if (error) {
    //   const { details } = error;
    //   const [firstError] = details;

    //   setErrors({
    //     ...errors,
    //     [input.name]: firstError.message,
    //   });
    // } else {
    //   const errorsInState = { ...errors };
    //   delete errorsInState[input.name];

    //   setErrors(errorsInState);
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(form);
  };

  // useEffect(() => {
  //   fetchUserData();
  //   return () => {};
  // });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ opacity: "97%" }}
    >
      <Grid
        container
        sx={{ width: "70vh", borderRadius: 5 }}
        component={Paper}
        elevation={6}
      >
        <Grid item xs={12}>
          <Box
            sx={{
              my: 5,
              mx: 4,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} mt={-3} ml="25.5rem">
              <IconButton>
                <ArrowBackIcon
                  onClick={() => navigate("/")}
                  fontSize="medium"
                />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <center>
                <Typography variant="h6" display="block" gutterBottom>
                  <Avatar src={logo} sx={{ width: 80, height: 80 }} />
                </Typography>
                <br />
              </center>
            </Grid>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid
                container
                alignItems="center"
                direction="column"
                style={{ padding: 10 }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "400",
                  }}
                >
                  <Grid container alignItems="center" direction="column">
                    <TextField
                      size="small"
                      margin="dense"
                      value={form.username}
                      onChange={handleChange}
                      name="username"
                      type="text"
                      // error={!!errors.username}
                      placeholder="Username"
                      label="Username"
                      fullWidth
                    />
                    {/* <FormHelperText>{errors.username}</FormHelperText> */}
                    <TextField
                      size="small"
                      margin="dense"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      fullWidth
                      label="Password"
                      // error={!!errors.password}
                      type={showPassword ? "text" : "password"}
                      fullwidthinputlabelprops={{ style: { fontSize: 15 } }}
                      InputProps={{
                        style: { fontSize: 15 },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon fontSize="small" />
                              ) : (
                                <VisibilityIcon fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* <FormHelperText>{errors.password}</FormHelperText> */}
                    <br />
                    <Button
                      type="submit"
                      variant="contained"
                      // disabled={isFormInvalid()}
                      sx={{
                        my: 2,
                      }}
                    >
                      Log In
                    </Button>
                  </Grid>
                  <br />
                  <Link
                    align="center"
                    href="/register"
                    color="primary"
                    sx={{ fontSize: 14 }}
                  >
                    CREATE AN ACCOUNT
                  </Link>
                </div>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
