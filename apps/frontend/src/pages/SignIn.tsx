import React, { useState } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { apiRoutes } from "../constants/apiRoutes";
import axios, { AxiosError } from "axios";
import { useNotification } from "../contexts/NotificationContext";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleInputChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.signIn}`;
    try {
      setIsLoading(true);
      const response = await axios.post(url, { ...formValues });
      if (response.status === 200) {
        showNotification("Successfully signed in", "success");
        window.localStorage.setItem(
          "access_token",
          response?.data?.data?.access_token
        );

        navigate(ROUTES.home);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        showNotification(error?.response?.data?.error, "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(ROUTES.signUp);
  };

  const checkDisabled = () => {
    if (!formValues.email || !formValues.password || isLoading) {
      return true;
    }
    return false;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Paper
        style={{
          width: "30vw",
          padding: 16,
          textAlign: "center",
        }}>
        <Typography variant="h5">Sign In Form</Typography>

        <TextField
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          value={formValues.email}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            id="outlined-adornment-password"
            type="password"
            label="Password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={checkDisabled()}>
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </FormControl>

        <Typography>
          Don&apos;t have an account?{" "}
          <Link component="button" onClick={goToSignUp}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};
