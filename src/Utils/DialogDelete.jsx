import { useContext } from "react";
//Dialog
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  Grid,
  Stack,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { BiMinusCircle } from "react-icons/bi";
//Import from project
import "../Style/dialogstyle.scss";
import { AuthContext } from "../Context/AuthContext";

export default function DialogDelete({
  open,
  loading,
  deleteTitle,
  handleClose,
  handleDelete,
}) {
  // Change Language
  const { t } = useContext(AuthContext);

  return (
    <Dialog open={open} className="dialog-container" fullWidth maxWidth="xs">
      <DialogTitle sx={{ padding: "10px 20px" }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="column" justifyContent="center">
            <Typography className="dialog-title">{deleteTitle}</Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="column" justifyContent="center">
            <IconButton onClick={handleClose}>
              <BiMinusCircle className="close-icon" />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{t("delete_des")}</Typography>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <Button className={t("class-btn-delete")} fullWidth>
                {t("loading")}
              </Button>
            ) : (
              <Button
                className={t("class-btn-delete")}
                fullWidth
                onClick={handleDelete}
              >
                {t("delete")}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
