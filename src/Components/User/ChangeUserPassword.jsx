import { useState, useContext } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { string, ref } from "yup";
import {
  Grid,
  Stack,
  Button,
  Dialog,
  TextField,
  Typography,
  Avatar,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import { useMutation } from "@apollo/client";
//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//Import from project
import "../../Style/dialogstyle.scss";
import { CHANGE_USER_PASSWORD } from "../../Schema/User";
import { AuthContext } from "../../Context/AuthContext";
import { DialogTitleComp } from "../../Utils/Component";

export default function ChangeUserPassword({ open, handleClose, editData }) {
  // Change Language
  const { t, setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  //hiden and show vibility =======================================
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [changeUserPassword] = useMutation(CHANGE_USER_PASSWORD, {
    onCompleted: ({ changeUserPassword }) => {
      setLoading(false);
      // console.log("changeUserPassword::", changeUserPassword);
      if (changeUserPassword?.isSuccess) {
        setAlert(true, "success", changeUserPassword?.message);
        handleClose();
      } else {
        setAlert(true, "error", changeUserPassword?.message);
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageKh: message, messageEn: message });
    },
  });

  //fromik
  const CheckValidation = Yup.object().shape({
    newPassword: Yup.string()
      .required("required!")
      .min(8, "Please input more then 8 charactor!"),
    confirmPassword: string()
      .required("require!")
      .oneOf([ref("newPassword")], "Wrong password!"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: CheckValidation,
    onSubmit: async (values) => {
      // console.log("values:::", values);
      setLoading(true);
      changeUserPassword({
        variables: {
          id: editData?._id,
          newPassword: values?.newPassword,
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog open={open} className="dialog-container" maxWidth="xs">
      <DialogTitleComp
        title={t("modal_title_change_password")}
        classTitle={"dialog-title"}
        classIcon={"close-icon"}
        handleClose={handleClose}
      />

      <DialogContent dividers>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <Avatar
                    className="avater-image"
                    src={editData?.profile ? editData?.profile : ""}
                  />
                </Stack>
                <Typography
                  className={t("class-name-field-title")}
                  sx={{ textAlign: "center", marginTop: "10px" }}
                >
                  {t("thead_profile")}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_password")}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  className="text-field"
                  placeholder={t("thead_password")}
                  type={show ? "text" : "password"}
                  {...getFieldProps("newPassword")}
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start" onClick={handleClick}>
                        {show ? (
                          <VisibilityIcon className="viewpw-icon" />
                        ) : (
                          <VisibilityOffIcon className="viewpw-icon" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_confirm_password")}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  className="text-field"
                  placeholder={t("thead_confirm_password")}
                  type={show ? "text" : "password"}
                  {...getFieldProps("confirmPassword")}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>

              <Grid item xs={12}>
                {loading ? (
                  <Button className={t("class-btn-create")} fullWidth>
                    {t("loading")}
                  </Button>
                ) : (
                  <Button
                    className={t("class-btn-create")}
                    fullWidth
                    onClick={handleSubmit}
                  >
                    {t("update")}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
