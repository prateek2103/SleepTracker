import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";

export function CustomAccordion({ summaryComp, ...props }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prevState) => !prevState)}
    >
      <AccordionSummary
        expandIcon={expanded ? <RemoveIcon /> : <AddIcon />}
        aria-controls="panel1-content"
      >
        {summaryComp}
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
