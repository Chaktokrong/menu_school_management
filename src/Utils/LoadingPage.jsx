import { Stack, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// import LoadingImage from "../../Assets/loading_icon.gif.mp4";

export default function LoadingPage() {
  return (
    <Stack direction="column" justifyContent="center" height="300px">
      <Stack direction="row" justifyContent="center">
        <CircularProgress color="primary" />
        {/* <img
          src={require("../../Assets/loading_icon.gif")}
        /> */}
      </Stack>
    </Stack>
  );
}
