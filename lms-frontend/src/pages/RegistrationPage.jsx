import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { ThemeContext } from "../context/theme/ThemeContext";
import bgImage from "../assets/registrationpage_bg.jpg";
import Joi from "joi";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  styled,
  Badge,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as id } from "uuid";
import logo from "../assets/logo.png";
import CloseIcon from "@mui/icons-material/Close";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const defaultFormValue = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };

  const schema = Joi.object({
    firstname: Joi.string().max(50).required().messages({
      "string.empty": `First Name is required`,
      "string.max": `First Name is limited to 50 characters`,
    }),
    lastname: Joi.string().max(50).required().messages({
      "string.empty": `Last Name is required`,
      "string.max": `Last Name is limited to 50 characters`,
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": `Email is required`,
        "string.email": `Email should be valid one`,
      }),
    username: Joi.string().min(5).max(15).required().messages({
      "string.empty": `Email is required`,
      "string.max": `Username is limited to 15 characters`,
      "string.min": `Username should contain at least 5 characters`,
    }),
    password: Joi.string()
      .pattern(
        new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
      )
      .required()
      .messages({
        "string.empty": `Password is required, we need to secure your account to prevent it from being hacked`,
        "string.pattern.base": `Password must at least contain one lowercase letter, one uppercase letter, a number and a special character`,
      }),
    role: Joi.string().allow(),
  });

  const [form, setForm] = useState(defaultFormValue);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp } = useContext(AuthContext);
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormInvalid = () => {
    const { id, ...otherFields } = form;
    const { error } = schema.validate(otherFields);

    return !!error;
  };

  const handleChange = ({ target: input }) => {
    setForm({
      ...form,
      [input.name]: input.value,
    });

    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);

    if (error) {
      const { details } = error;
      const [firstError] = details;

      setErrors({
        ...errors,
        [input.name]: firstError.message,
      });
    } else {
      const errorsInState = { ...errors };
      delete errorsInState[input.name];

      setErrors(errorsInState);
    }
  };

  const handleFileChange = ({ target }) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    const [file] = target.files;

    setImage(file);
  };

  const FileInput = styled("input")({
    display: "none",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signUp({
        userId: id(),
        firstName: form.firstname,
        lastName: form.lastname,
        email: form.email,
        username: form.username,
        password: form.password,
        role: "user",
        image: image,
      });
      onShowToastNotification({
        message: "Registered successfully",
        severity: "success",
      });
      navigate("/");
    } catch (error) {
      onShowToastNotification({
        message: "Registration failed because of:" + error.message,
        severity: "error",
      });
    }
    setTimeout(() => {
      onHideToastNotification();
    }, 6000);

    setLoading(false);
  };

  const handleClose = () => {
    setLoading(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <br />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid
          container
          sx={{
            width: "70vh",
            height: "90vh",
            borderRadius: 5,
            opacity: "95%",
          }}
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
                    sx={{ ":hover": { cursor: "pointer" } }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                  display="flex"
                  gutterBottom
                  mt={1}
                >
                  Let's get started at&nbsp;&nbsp;
                  <Avatar src={logo} sx={{ width: 40, height: 40 }} />
                </Typography>
              </Grid>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container display="d-flex" flexDirection="row">
                  <Grid item xs={6}>
                    <TextField
                      error={!!errors.firstname}
                      helperText={errors.firstname ?? "\u00a0"}
                      value={form.firstname}
                      required
                      onChange={handleChange}
                      margin="normal"
                      label="First Name"
                      type="text"
                      name="firstname"
                      sx={{ width: "95%" }}
                      variant="standard"
                      InputProps={{ style: { fontSize: 13.5 } }}
                      InputLabelProps={{ style: { fontSize: 13.5 } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      error={!!errors.lastname}
                      helperText={errors.lastname ?? "\u00a0"}
                      value={form.lastname}
                      required
                      onChange={handleChange}
                      margin="normal"
                      sx={{ width: "95%" }}
                      label="Last Name"
                      type="text"
                      name="lastname"
                      variant="standard"
                      InputProps={{ style: { fontSize: 13.5 } }}
                      InputLabelProps={{ style: { fontSize: 13.5 } }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={!!errors.email}
                    helperText={errors.email ?? "\u00a0"}
                    value={form.email}
                    required
                    onChange={handleChange}
                    margin="normal"
                    sx={{ width: "97.5%" }}
                    label="Email"
                    type="email"
                    name="email"
                    variant="standard"
                    InputProps={{ style: { fontSize: 13.5 } }}
                    InputLabelProps={{ style: { fontSize: 13.5 } }}
                  />
                </Grid>
                <Grid container display="d-flex" flexDirection="row">
                  <Grid item xs={6}>
                    <TextField
                      error={!!errors.username}
                      helperText={errors.username ?? "\u00a0"}
                      value={form.username}
                      required
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      label="Username"
                      type="text"
                      name="username"
                      sx={{ width: "95%" }}
                      variant="standard"
                      InputProps={{ style: { fontSize: 13.5 } }}
                      InputLabelProps={{ style: { fontSize: 13.5 } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      error={!!errors.password}
                      helperText={
                        errors.password ?? (
                          <>
                            &nbsp;
                            <br />
                            &nbsp;
                            <br />
                            &nbsp;
                          </>
                        )
                      }
                      value={form.password}
                      required
                      onChange={handleChange}
                      margin="normal"
                      fullWidth
                      name="password"
                      sx={{ width: "95%" }}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: 13.5 } }}
                      InputProps={{
                        style: { fontSize: 13.5 },
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
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    component="span"
                    sx={{
                      p: 1,
                      width: 900,
                      border: "1px dashed grey",
                      mt: 1,
                    }}
                  >
                    <center>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        fontSize={15}
                      >
                        Upload your profile picture
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        fontWeight="fontWeightLight"
                        fontSize={10}
                      >
                        Optional
                      </Typography>
                      <label htmlFor="icon-button-file">
                        <FileInput
                          onChange={handleFileChange}
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                        />

                        {image ? (
                          <Badge
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <IconButton
                                onClick={() => {
                                  setImage(null);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            }
                          >
                            <IconButton component="span">
                              <Avatar
                                src={URL.createObjectURL(image)}
                                style={{
                                  width: 40,
                                  height: 40,
                                }}
                              />
                            </IconButton>
                          </Badge>
                        ) : (
                          <IconButton component="span">
                            <Avatar sx={{ width: 40, height: 40 }} />
                          </IconButton>
                        )}
                      </label>
                    </center>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <center>
                    <Button
                      disabled={isFormInvalid()}
                      color="info"
                      size="small"
                      type="submit"
                      variant="contained"
                      sx={{ my: 3, width: "30%", backgroundColor: "black" }}
                    >
                      Sign Up
                    </Button>
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={loading}
                      onClick={handleClose}
                    >
                      <CircularProgress color="inherit" size={"10vh"} />
                    </Backdrop>
                  </center>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
