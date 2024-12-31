import React from "react";

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

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const goToSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(ROUTES.signUp);
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
          label="Email"
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
        />
        <FormControl variant="outlined" fullWidth margin="normal" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            label="Password"
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <Button variant="contained">Sign In</Button>
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
