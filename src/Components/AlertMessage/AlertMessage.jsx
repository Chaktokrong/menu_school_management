import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
//Import from project
import { AuthContext } from "../../Context/AuthContext";
import "./alertmessage.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage() {
  const { language, alert, setAlert } = useContext(AuthContext);

  let open = alert()?.open;
  let message = alert()?.message;
  let status = alert()?.status;

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") return;
    setAlert(false, "", { messageKh: "", messageEn: "" });
  };

  return (
    <div className="alert-message">
      {status === "success" ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className="snackbar-alert"
        >
          <Alert
            onClose={handleCloseAlert}
            className={language === "en" ? "alert-success" : "alert-success-kh"}
            severity="success"
          >
            {language === "en" ? message?.messageEn : message?.messageKh}
          </Alert>
        </Snackbar>
      ) : null}

      {status === "error" ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className="snackbar-alert"
        >
          <Alert
            onClose={handleCloseAlert}
            className={language === "en" ? "alert-error" : "alert-error-kh"}
            severity="error"
          >
            {language === "en" ? message?.messageEn : message?.messageKh}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}
