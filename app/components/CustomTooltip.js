import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#16cdc7",
    color: "#FFFFFF",
    fontSize: "0.875rem",
    padding: "8px 12px",
    borderRadius: "50px",
    boxShadow: theme?.shadows?.[1] || "0px 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "var(--prompt)",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#16cdc7",
  },
}));

export default CustomTooltip;
