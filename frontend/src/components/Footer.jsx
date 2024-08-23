import React from "react";
import { Box, Typography, Container } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(rgb(36, 119, 170) 0%, rgb(100, 97, 224) 100%)", // Dark background color
        color: "white", // Light text color
        py: 2, // Padding y-axis
        position: "absolute",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        "& a": {
          color: "white",
          textDecoration: "none",
        },
      }}
    >
      <Container>
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        {/* <Typography variant="body2">
          <a href="/privacy-policy">Privacy Policy</a> |
          <a href="/terms-of-service"> Terms of Service</a>
        </Typography> */}
      </Container>
    </Box>
  );
}

export default Footer;
