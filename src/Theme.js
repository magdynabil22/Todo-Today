import { createTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: "#f03d66ff",
    },
  },
});
