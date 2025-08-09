import { useContext, useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import { useMutation } from "@apollo/client";
import { BiMinusCircle } from "react-icons/bi";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
//Import from project
import "../../Style/dialogstyle.scss";
import { AuthContext } from "../../Context/AuthContext";
import { UPDATE_COMPLETE_CLASS } from "../../Schema/Class";

export default function Status({ open, editData, setRefetch, handleClose }) {
  // Change Language
  const { setAlert, t } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [updateCompleteClass] = useMutation(UPDATE_COMPLETE_CLASS, {
    onCompleted: ({ updateCompleteClass }) => { 
      setLoading(false);
      if (updateCompleteClass?.isSuccess === true) {
        setAlert(true, "success", updateCompleteClass?.message);
        handleClose();
        setRefetch();
      } else {
        setAlert(true, "error", updateCompleteClass?.message);
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageEn: message, messageKh: message });
    },
  });

  const handleSubmit = () => {
    updateCompleteClass({
      variables: {
        id: editData?._id,
      },
    });
  };

  return (
    <Dialog open={open} className="dialog-container" maxWidth="xs" fullWidth>
      <DialogTitle sx={{ padding: "10px 20px" }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-end"
          justifyContent="center"
        >
          <Typography className="dialog-title">
            {t("thead_graduate")}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleClose}>
            <BiMinusCircle className="close-icon" /> 
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers> 
        <Grid container rowSpacing={2} columnSpacing={3}>
          <Grid item xs={12}>
            <Typography>{t("thead_do_you_want_to_completed_this_data")}</Typography> 
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <Button className="btn-create" fullWidth>
                {t("loading")}
              </Button>
            ) : (
              <Button className="btn-create" fullWidth onClick={handleSubmit}>
                {t("complete")}
              </Button>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
