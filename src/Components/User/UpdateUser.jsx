import React, { useState, useContext, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
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
} from "@mui/material";
import { useMutation } from "@apollo/client";
//Import from project
import "../../Style/dialogstyle.scss";
import { UPDATE_USER } from "../../Schema/User";
import { AuthContext } from "../../Context/AuthContext";
import { DialogTitleComp } from "../../Utils/Component";
import { useDeleteImageServer } from "../CropImage/DeleteImageServer";
import EmptyImage from "../../Assets/empty-image.png";
import CropImageFile from "../CropImage/CropImageFile";
import LoadingProgess from "../../Utils/LoadingProgress";
import { hasPermission } from "../../Context/Permission";
export default function UpdateUser({
  open,
  handleClose,
  editData,
  setRefetch,
}) {
  // Change Language
  const { t, setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const mutationDelete = useDeleteImageServer();
  const userLogin = JSON.parse(window.localStorage.getItem("userLogin"));
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

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      setLoading(false);
      if (updateUser?.isSuccess) {
        setAlert(true, "success", updateUser?.message);
        handleClose();
        setRefetch();
        // delete iamge from server ====================================================
        if (profileHook && editData?.profile) {
          let splitSrc = editData?.profile?.split(":")[4];
          mutationDelete.mutate({
            storage: "sr_music_academy",
            folder: "sr_music_images",
            file: splitSrc.split("/")[0],
          });
        }
        setProfileHook("");
        setImageFile("");
      } else {
        setAlert(true, "error", updateUser?.message);
        console.log("error::");
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageKh: message, messageEn: message });
    },
  });

  //fromik
  const CheckValidation = Yup.object().shape({
    familyName: Yup.string().required("require!"),
    userName: Yup.string().required("require!"),
    profile: Yup.string(),
    gender: Yup.string(),
    email: Yup.string().email("Invalid email!").required("require!"),
    role: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      familyName: "",
      userName: "",
      profile: "",
      gender: "Male",
      email: "",
      role: "Admin",
    },

    validationSchema: CheckValidation,
    onSubmit: async (value) => {
      // console.log("value::", value);
      setLoading(true);
      updateUser({
        variables: {
          id: editData?._id,
          input: {
            familyName: value?.familyName,
            userName: value?.userName,
            profile: profileHook ? profileHook : editData?.profile,
            gender: value?.gender,
            role: value?.role,
            email: value?.email,
            // phoneNumber: "",
            // nationlity: "",
            // address: "",
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
  } = formik;

  // console.log("editData::", editData);

  useEffect(() => {
    if (editData?._id) {
      setFieldValue("familyName", editData?.familyName);
      setFieldValue("userName", editData?.userName);
      setFieldValue("gender", editData?.gender);
      setFieldValue("email", editData?.email);
      setFieldValue("role", editData?.role);
    }
  }, [open]);

  return (
    <Dialog open={open} className="dialog-container" maxWidth="sm" fullWidth>
      <DialogTitleComp
        title={t("modal_title_update_user")}
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
                                : editData?.profile
                                ? editData?.profile
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
                  {hasPermission(userLogin?.user?.role, "select:teacher") &&   <MenuItem value={"Teacher"}>Teacher</MenuItem>}
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"SuperAdmin"}>Super Admin</MenuItem>
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
