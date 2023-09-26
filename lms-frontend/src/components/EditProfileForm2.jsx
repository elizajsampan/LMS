import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const EditProfileForm2 = () => {
  const defaultFormValue = {
    password: "",
    passwordConfirm: "",
  };
  const schema = Joi.object({
    password: Joi.string()
      .pattern(
        new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)
      )
      .required()
      .label("New Password")
      .messages({
        "string.empty": `New Password is not allowed to be empty`,
        "string.pattern.base": `New Password must have a lowercase letter, uppercase letter, number and special character`,
      }),
    passwordConfirm: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm New Password")
      .options({
        messages: { "any.only": "{{#label}} does not match with New Password" },
      }),
  });

  const [form, setForm] = useState(defaultFormValue);
  const [errors, setErrors] = useState({});
  const { handleEditPassword } = useContext(AuthContext);

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

  const handleSubmit = async (event) => {
    await handleEditPassword({
      password: form.password,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Box
      component={Paper}
      elevation="3"
      sx={{ marginTop: -2, width: 1000, marginLeft: 0 }}
    >
      <Grid xs={12} marginBottom="15px">
        <center>
          <Typography variant="h6" marginTop="20px">
            Account Security
          </Typography>
          <Typography variant="body1" marginTop="10px">
            Edit your password
          </Typography>
        </center>
      </Grid>
      <Divider />
      <Grid marginTop={5} marginLeft={15}>
        <Grid>
          <TextField
            error={!!errors.password}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            label="New Password"
            type="password"
            name="password"
            variant="outlined"
            InputProps={{ style: { fontSize: 13.5 } }}
            InputLabelProps={{ style: { fontSize: 13.5 } }}
            sx={{ width: 800 }}
            helperText={errors.password ?? "\u00a0"}
          />
          <TextField
            error={!!errors.passwordConfirm}
            value={form.passwordConfirm}
            onChange={handleChange}
            margin="normal"
            label="Confirm New Password"
            type="password"
            name="passwordConfirm"
            variant="outlined"
            InputProps={{ style: { fontSize: 13.5 } }}
            InputLabelProps={{ style: { fontSize: 13.5 } }}
            sx={{ width: 800 }}
            helperText={errors.passwordConfirm ?? "\u00a0"}
          />
          <center>
            <Button
              type="submit"
              variant="contained"
              disabled={isFormInvalid()}
              onClick={() => handleSubmit()}
              sx={{
                bgcolor: "black",
                marginTop: 2,
                marginLeft: -16,
              }}
            >
              Save Changes
            </Button>
          </center>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfileForm2;
