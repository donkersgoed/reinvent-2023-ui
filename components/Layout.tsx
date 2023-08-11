import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "./Navbar";
import { Box } from "@mui/material";

const theme = createTheme();

interface LayoutProps {
  title: string;
}

export default function Layout({ title, ...props }: LayoutProps & React.ComponentProps<"div">) {
  console.log(title);
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Navbar title={title} />

        <Box component="main" flex={1} overflow="auto" height={"calc(100dvh - 64px)"}>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
