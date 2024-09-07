import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Grid, Paper, Typography, IconButton } from "@mui/material";

export default function TimeSlotComponent({ sleepTime, wakeTime }) {
  const [editOptions, setEditOptions] = useState(false);
  return (
    <Grid item xs={3} md={3} lg={3} sm={3}>
      <Paper
        sx={{
          backgroundColor: "F7F7F7",
          padding: "1rem",
          transition: "all 2s linear",
        }}
        elevation={2}
        onMouseEnter={() => setEditOptions(true)}
        onMouseLeave={() => setEditOptions(false)}
      >
        <Typography
          variant="h6"
          component="span"
          sx={{ color: "black", marginRight: "2rem", display: "inline-block" }}
        >
          {sleepTime + " - " + wakeTime}
        </Typography>
        {editOptions && (
          <IconButton sx={{ padding: 0, float: "right" }}>
            <DeleteIcon />
          </IconButton>
        )}
      </Paper>
    </Grid>
  );
}
