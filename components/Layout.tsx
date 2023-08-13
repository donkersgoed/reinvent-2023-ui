import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

const theme = createTheme();

export default function Layout({ ...props }: React.ComponentProps<"div">) {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />

        <Box component="main" flex={1} overflow="auto" height={"calc(100dvh"}>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
