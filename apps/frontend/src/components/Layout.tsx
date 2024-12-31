import React, { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Container } from "@mui/material";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <Container>{children}</Container>
    </>
  );
};
