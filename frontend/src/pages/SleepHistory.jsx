import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";

export function SleepHistory() {
  return (
    <Container sx={{ width: "80%", marginTop: "2rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Grid spacing={2} sx={{ marginTop: "1rem" }} container>
          <Grid
            item
            xs={12}
            md={12}
            lg={1}
            sm={12}
            sx={{ marginRight: "0.5rem", display: "flex" }}
          >
            <Box display="flex" alignItems="center" height="100%">
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "rgb(100, 97, 224)" }}
              >
                Week
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={1} sm={12}>
            <Paper
              sx={{
                background:
                  "linear-gradient(rgb(36, 119, 170) 0%, rgb(100, 97, 224) 100%)",
                // padding: "1rem",
                borderRadius: "50%",
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              elevation={3}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "white", textAlign: "center" }}
              >
                1
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={1} sm={12}>
            <Paper
              sx={{
                background: "white",
                // padding: "1rem",
                borderRadius: "50%",
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              elevation={3}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "rgb(100, 97, 224)", textAlign: "center" }}
              >
                2
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={1} sm={12}>
            <Paper
              sx={{
                background: "white",
                // padding: "1rem",
                borderRadius: "50%",
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              elevation={3}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "rgb(100, 97, 224)", textAlign: "center" }}
              >
                3
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={1}
            sm={12}
            sx={{ marginRight: "1rem" }}
          >
            <Paper
              sx={{
                background: "white",
                // padding: "1rem",
                borderRadius: "50%",
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              elevation={3}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "rgb(100, 97, 224)", textAlign: "center" }}
              >
                4
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={5} sm={12}>
            <Box
              sx={{
                // padding: "1rem",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "rgb(100, 97, 224)", textAlign: "center" }}
              >
                August
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={1} sm={12}>
            <Box
              sx={{
                // padding: "1rem",
                height: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ color: "rgb(100, 97, 224)", textAlign: "center" }}
              >
                2024
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          background: "#F7F7F7",
          padding: "2rem",
          marginTop: "2rem",
          borderRadius: "1rem",
        }}
      >
        <Box sx={{ height: "100%" }} alignItems="center">
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "rgb(100, 97, 224)", display: "inline-block" }}
          >
            Monday
          </Typography>
          <Paper
            sx={{
              backgroundColor: "#D0D0D0",
              padding: "0.5rem",
              display: "inline-block",
              marginLeft: "0.5rem",
            }}
          >
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "black", fontSize: "0.8rem" }}
            >
              19th Aug 2024
            </Typography>
          </Paper>
          <Box sx={{ marginTop: "1rem" }} alignItems="center">
            <Grid container spacing={2}>
              <Grid item xs={3} md={3} lg={2} sm={3}>
                <Paper
                  sx={{ backgroundColor: "F7F7F7", padding: "1rem" }}
                  elevation={2}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "black" }}
                  >
                    9.00 - 10.00
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3} md={3} lg={2} sm={3}>
                <Paper
                  sx={{ backgroundColor: "F7F7F7", padding: "1rem" }}
                  elevation={2}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "black" }}
                  >
                    12.00 - 1.00 AM
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ marginTop: "2rem" }} alignItems="center">
          <Typography
            variant="h5"
            component="h2"
            sx={{ color: "rgb(100, 97, 224)", display: "inline-block" }}
          >
            Tuesday
          </Typography>
          <Paper
            sx={{
              backgroundColor: "#D0D0D0",
              padding: "0.5rem",
              display: "inline-block",
              marginLeft: "0.5rem",
            }}
            elevation={0}
          >
            <Typography
              variant="body2"
              component="span"
              sx={{ color: "black", fontSize: "0.8rem" }}
            >
              20th Aug 2024
            </Typography>
          </Paper>
          <Box sx={{ marginTop: "0.5rem" }} alignItems="center">
            <Grid container spacing={2}>
              <Grid item xs={3} md={3} lg={2} sm={3}>
                <Paper
                  sx={{ backgroundColor: "F7F7F7", padding: "1rem" }}
                  elevation={2}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "black" }}
                  >
                    9.00 - 10.00
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3} md={3} lg={2} sm={3}>
                <Paper
                  sx={{ backgroundColor: "F7F7F7", padding: "1rem" }}
                  elevation={2}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "black" }}
                  >
                    12.00 - 1.00 AM
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={3} md={3} lg={2} sm={3}>
                <Paper
                  sx={{ backgroundColor: "F7F7F7", padding: "1rem" }}
                  elevation={2}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "black" }}
                  >
                    12.00 - 1.00 AM
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
