import { useState, useContext, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { string, ref } from "yup";
import {
  Box,
  Grid,
  Stack,
  Button,
  Select,
  Dialog,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import { useMutation } from "@apollo/client";
//Icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//Import from project
import "../../Style/dialogstyle.scss";
import { CREATE_USER } from "../../Schema/User";
import { AuthContext } from "../../Context/AuthContext";
import { DialogTitleComp } from "../../Utils/Component";
import { useDeleteImageServer } from "../CropImage/DeleteImageServer";

import EmptyImage from "../../Assets/empty-image.png";
import CropImageFile from "../CropImage/CropImageFile";
import LoadingProgess from "../../Utils/LoadingProgress";

export default function CreateUser({ open, handleClose, setRefetch }) {
  // Change Language
  const { t, setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const mutationDelete = useDeleteImageServer();

  //hiden and show vibility =======================================
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // =================================== Upload Image ====================================
  const [profileHook, setProfileHook] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  const [statusProgress, setStatusProgress] = useState(false);
  const [progress, setProgress] = useState(10);

  const handleUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageFile(imageFile);
      setPhotoURL(URL.createObjectURL(imageFile));
      setOpenCrop(true);
    }
  };

  const handleCloseAction = () => {
    handleClose();
    if (profileHook) {
      // delete iamge from server ====================================================
      let splitSrc = profileHook?.split(":")[4];
      mutationDelete.mutate({
        storage: "sr_music_academy",
        folder: "sr_music_images",
        file: splitSrc.split("/")[0],
      });
    }
    setProfileHook("");
    setImageFile("");
  };

  // ================================= End upload Image ===============================

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      setLoading(false);
      if (createUser?.isSuccess === true) {
        setAlert(true, "success", createUser?.message);
        handleClose();
        resetForm();
        setRefetch();
        setProfileHook("");
        setImageFile("");
      } else {
        setAlert(true, "error", createUser?.message);
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageKh: message, messageEn: message });
    },
  });

  //fromik
  const CheckValidation = Yup.object().shape({
    familyName: Yup.string().required(t("required")),
    userName: Yup.string().required(t("required")),
    profile: Yup.string(),
    gender: Yup.string(),
    email: Yup.string().email("Invalid email!").required(t("required")),
    password: Yup.string()
      .required("required!")
      .min(8, "Please input more then 8 charactor!"),
    confirmPassword: string()
      .required(t("required"))
      .oneOf([ref("password")], "Wrong password!"),
    role: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      familyName: "",
      userName: "",
      profile: "",
      gender: "Male",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin",
    },

    validationSchema: CheckValidation,
    onSubmit: async (values) => {
      setLoading(true);
      createUser({
        variables: {
          input: {
            familyName: values?.familyName,
            userName: values?.userName,
            profile: profileHook,
            gender: values?.gender,
            role: values?.role,
            email: values?.email,
            password: values?.password,
          },
        },
      });
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    values,
    resetForm,
  } = formik;

  return (
    <Dialog open={open} className="dialog-container" maxWidth="sm" fullWidth>
      <DialogTitleComp
        title={t("modal_title_create_user")}
        classTitle={"dialog-title"}
        classIcon={"close-icon"}
        handleClose={handleCloseAction}
      />

      <DialogContent dividers>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <Grid item xs={12}>
                {!openCrop ? (
                  <Box>
                    <Stack direction="row" justifyContent="center">
                      <Tooltip title="click to upload">
                        <Button component="label">
                          <TextField
                            className="text-field"
                            type="file"
                            id="image"
                            sx={{ display: "none" }}
                            onChange={handleUploadImage}
                          />
                          <img
                            className="avater-image"
                            src={
                              imageFile
                                ? URL.createObjectURL(imageFile)
                                : EmptyImage
                            }
                          />
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Box>
                ) : (
                  <CropImageFile
                    setProgress={setProgress}
                    setStatusProgress={setStatusProgress}
                    openCrop={openCrop}
                    setOpenCrop={setOpenCrop}
                    photoURL={photoURL}
                    setPhotoURL={setPhotoURL}
                    setImageFile={setImageFile}
                    setProfileHook={setProfileHook}
                  />
                )}

                {statusProgress && progress < 100 ? (
                  <LoadingProgess
                    progress={progress}
                    setProgress={setProgress}
                  />
                ) : (
                  <Typography
                    className={t("class-name-field-title")}
                    sx={{ textAlign: "center", marginTop: "10px" }}
                  >
                    {t("thead_profile")}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_last_name")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  fullWidth
                  placeholder={t("thead_last_name")}
                  {...getFieldProps("familyName")}
                  error={Boolean(touched.familyName && errors.familyName)}
                  helperText={touched.familyName && errors.familyName}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_first_name")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  fullWidth
                  placeholder={t("thead_first_name")}
                  {...getFieldProps("userName")}
                  error={Boolean(touched.userName && errors.userName)}
                  helperText={touched.userName && errors.userName}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_gender")}
                </Typography>
                <FormControl fullWidth className="search-field" size="small">
                  <Select
                    value={values?.gender}
                    onChange={(e) => setFieldValue("gender", e?.target.value)}
                  >
                    <MenuItem value={"Male"}>{t("thead_male")}</MenuItem>
                    <MenuItem value={"Female"}>{t("thead_female")}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_role")}
                </Typography>
                <FormControl fullWidth className="search-field" size="small">
                  <Select
                    value={values?.role}
                    onChange={(e) => setFieldValue("role", e?.target.value)}
                  >
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"SuperAdmin"}>Super Admin</MenuItem>
                    {/* <MenuItem value={"Teacher"}>Teacher</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_email")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  fullWidth
                  placeholder={t("thead_email")}
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_password")}
                </Typography>
                <TextField
                  className="text-field"
                  fullWidth
                  size="small" 
                  placeholder={t("thead_password")}
                  type={show ? "text" : "password"}
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
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

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_confirm_password")}
                </Typography>
                <TextField
                  className="text-field"
                  fullWidth
                  size="small" 
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
                    disabled={statusProgress && progress < 100 ? true : false}
                  >
                    {t("create")}
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
