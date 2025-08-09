import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import "./emptydata.scss";
import { AuthContext } from "../../../Context/AuthContext";
import EmptyImage from "../../../Assets/empty-box.png";

export default function EmptyData() {
  // Change Language
  const { t } = useContext(AuthContext);

  return (
    <Stack direction="row" justifyContent="center" className="empty-container">
      <Stack
        height="300px"
        spacing={1}
        direction="column"
        justifyContent="center"
      >
        <Stack direction="row" justifyContent="center">
          <img src={EmptyImage} alt="icon" className="empty-image" />
        </Stack>
        <Typography className="text-title">{t("thead_no_data")}</Typography>
      </Stack>
    </Stack>
  );
}
