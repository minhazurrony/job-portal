import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Link } from "@mui/material";
import { ROUTES } from "../routes";
import { useNavigate } from "react-router-dom";

export const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.localStorage.removeItem("access_token");
    navigate(ROUTES.signIn);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" href={ROUTES.home} underline="hover">
              Job Portal
            </Link>
          </Typography>

          <Button color="inherit" onClick={handleLogOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
