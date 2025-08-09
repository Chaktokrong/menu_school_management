import { useNavigate } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
import "./page404.scss";
import Preview from "../Assets/404-error-preview.png";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <Stack direction="column" justifyContent="center" height="88vh">
        <img width="500px" height="auto" src={`${Preview}`} />
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        marginTop="15px"
        height="88vh"
      >
        <Typography variant="h2" className="marsk">
          Page not found!
        </Typography>

        <Typography>
          The page you request was not found, and have a fine guess why.
          <br />
          If you type URL directly please make sure the <br />
          spelling is correct. Have no fear, help is near.
        </Typography>

        <Stack direction="row" spacing={2} mt={5}>
          <Button
            className="btn-home"
            variant="outlined"
            onClick={() => navigate("/")}
          >
            <Typography variant="h5">Go Home</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
