// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(100, 97, 224)", // Soft Blue
    },
    secondary: {
      main: "#A1C4FD", // Light Slate
    },
    background: {
      default: "#F7F7F7", // Off-White for the general background
      paper: "#FFFFFF", // Pure White for cards and paper elements
    },
    text: {
      primary: "#333333", // Deep Charcoal
      secondary: "#6CC5F3", // Soft Blue for secondary text
    },
    info: {
      main: "#D4D4D4", // Cool Gray
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      color: "#333333", // Deep Charcoal
    },
    h2: {
      color: "#333333",
    },
    h3: {
      color: "#333333",
    },
    body1: {
      color: "#333333", // Deep Charcoal
    },

    h5: {
      color: "#FFFFFF",
    },
    h6: {
      color: "#FFFFFF",
      fontSize: "1rem", // Deep Charcoal
    },
    a: {
      color: "#FFFFFF",
      // Deep Charcoal
    },
    button: {
      textTransform: "none",
      color: "#FFFFFF", // White for button text
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(rgb(36, 119, 170) 0%, rgb(100, 97, 224) 100%)",
          color: "#FFFFFF", // White for button text
          border: "none",
          borderRadius: "4px",
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            background:
              "linear-gradient(rgb(36, 119, 170) 0%, rgb(100, 97, 224) 100%)",
            opacity: 0.9,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#A1C4FD", // Light Slate for the AppBar background
          color: "#333333", // Deep Charcoal for AppBar text
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // Pure White for paper elements
          color: "#333333", // Deep Charcoal for text inside paper
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#F7F7F7", // Off-White for text fields
          "& .MuiInputBase-input": {
            color: "#333333", // Deep Charcoal for input text
          },
          "& .MuiInputLabel-root": {
            color: "333333", // Soft Blue for labels
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(to bottom, #FFFFFF 0%, #F7F7F7 100%)", // Off-White
          margin: 0,
          minHeight: "100vh",
        },
      },
    },
  },
});

export default theme;
