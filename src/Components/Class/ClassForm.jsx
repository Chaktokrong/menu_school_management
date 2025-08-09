import { useContext, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Dialog,
  Button,
  FormHelperText,
  TextField,
  Typography,
  DialogContent,
} from "@mui/material";

//Import from project
import "../../Style/dialogstyle.scss";
import { AuthContext } from "../../Context/AuthContext";
import { DialogTitleComp } from "../../Utils/Component";

import useClassForm from "./Hooks/useClassForm";
import {
  SelectShift,
  SelectUser,
  SelectCourse,
} from "../Include/DynamicSelect/DynamicSelect.jsx";

export default function ClassForm({
  open,
  editData,
  setRefetch,
  dialogTitle,
  handleClose,
}) {
  // Change Language
  const { language, t } = useContext(AuthContext);

  //fromik
  const CheckValidation = Yup.object().shape({
    className: Yup.string().required(t("required")),

    courseId: Yup.object().shape({
      id: Yup.string().required(t("required")),
      title: Yup.string(),
    }),

    shiftId: Yup.object().shape({
      id: Yup.string().required(t("required")),
      title: Yup.string(),
    }),

    teacherId: Yup.object().shape({
      id: Yup.string().required(t("required")),
      title: Yup.string(),
    }),

    duration: Yup.number().moreThan(0).required(t("required")),
    totalHour: Yup.number().nullable(),
    totalLesson: Yup.number().nullable(),
    remark: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      className: "",

      shiftId: { id: "", title: "" },
      courseId: { id: "", title: "" },
      teacherId: { id: "", title: "" },

      duration: "",
      totalHour: null,
      totalLesson: null,
      remark: "",
    },
    validationSchema: CheckValidation,
    onSubmit: async (values) => {
      setLoading(true);
      if (dialogTitle === "Create") {
        createClass({
          variables: {
            input: {
              ...values,
              shiftId: values?.shiftId?.id,
              courseId: values?.courseId?.id,
              teacherId: values?.teacherId?.id,
            },
          },
        });
      } else {
        updateClass({
          variables: {
            id: editData?._id,
            input: {
              ...values,
              shiftId: values?.shiftId?.id,
              courseId: values?.courseId?.id,
              teacherId: values?.teacherId?.id,
            },
          },
        });
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    getFieldProps,
    resetForm,
  } = formik;

  const { createClass, updateClass, loading, setLoading } = useClassForm({
    resetForm,
    setRefetch,
    handleClose,
  });

  useEffect(() => {
    if (dialogTitle === "Update" && editData) {
      setFieldValue("className", editData?.className);

      setFieldValue("shiftId", {
        id: editData?.shiftId?._id,
        title:
          language === "en"
            ? editData?.shiftId?.enName
            : editData?.shiftId?.khName,
      });

      setFieldValue("courseId", {
        id: editData?.courseId?._id,
        title:
          language === "en"
            ? editData?.courseId?.enName
            : editData?.courseId?.khName,
      });

      setFieldValue("teacherId", {
        id: editData?.teacherId?._id,
        title: editData?.teacherId?.userName,
      });

      setFieldValue("duration", editData?.duration);
      setFieldValue("totalHour", editData?.totalHour);
      setFieldValue("totalLesson", editData?.totalLesson);

      setFieldValue("remark", editData?.remark);
    }

    if (dialogTitle === "Create" && open) {
      resetForm();
    }
  }, [open, editData]);

  return (
    <Dialog open={open} className="dialog-container" maxWidth="sm" fullWidth>
      <DialogTitleComp
        title={
          dialogTitle === "Create"
            ? t("modal_title_create_class")
            : t("modal_title_update_class")
        }
        classTitle={"dialog-title"}
        classIcon={"close-icon"}
        handleClose={handleClose}
      />

      <DialogContent dividers>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <SelectCourse
                  className="text-field"
                  onChange={(val) =>
                    setFieldValue("courseId", val || { id: "", title: "" })
                  }
                  value={values?.courseId}
                />
                {!!errors?.courseId?.id && touched?.courseId?.id && (
                  <FormHelperText error id="outlined-adornment-password">
                    {errors?.courseId?.id}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_class_name")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  fullWidth
                  placeholder={t("thead_class_name")}
                  {...getFieldProps("className")}
                  error={Boolean(touched.className && errors.className)}
                  helperText={touched.className && errors.className}
                />
              </Grid>

              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <SelectUser
                  className="text-field"
                  onChange={(val) =>
                    setFieldValue("teacherId", val || { id: "", title: "" })
                  }
                  value={values?.teacherId}
                  role={"Teacher"}
                />

                {!!errors?.teacherId?.id && touched?.teacherId?.id && (
                  <FormHelperText error id="outlined-adornment-password">
                    {errors?.teacherId?.id}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <SelectShift
                  className="text-field"
                  onChange={(val) =>
                    setFieldValue("shiftId", val || { id: "", title: "" })
                  }
                  value={values?.shiftId}
                />
                {!!errors?.shiftId?.id && touched?.shiftId?.id && (
                  <FormHelperText error id="outlined-adornment-password">
                    {errors?.shiftId?.id}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_total_hour")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  type="number"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Typography className={t("class-name-field-title")}>
                        {t("thead_hour")}
                      </Typography>
                    ),
                  }}
                  placeholder={t("thead_total_hour")}
                  {...getFieldProps("totalHour")}
                  error={Boolean(touched.totalHour && errors.totalHour)}
                  helperText={touched.totalHour && errors.totalHour}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_total_lesson")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  type="number"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Typography className={t("class-name-field-title")}>
                        {t("thead_lesson")}
                      </Typography>
                    ),
                  }}
                  placeholder={t("thead_total_lesson")}
                  {...getFieldProps("totalLesson")}
                  error={Boolean(touched.totalLesson && errors.totalLesson)}
                  helperText={touched.totalLesson && errors.totalLesson}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_duration")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  type="number"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <Typography className={t("class-name-field-title")}>
                        {t("thead_hour")}
                      </Typography>
                    ),
                  }}
                  placeholder={t("thead_duration")}
                  {...getFieldProps("duration")}
                  error={Boolean(touched.duration && errors.duration)}
                  helperText={touched.duration && errors.duration}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography className={t("class-name-field-title")}>
                  {t("thead_remark")}
                </Typography>
                <TextField
                  className="text-field"
                  size="small"
                  minRows={2}
                  multiline
                  fullWidth
                  placeholder={t("thead_remark")}
                  {...getFieldProps("remark")}
                  error={Boolean(touched.remark && errors.remark)}
                  helperText={touched.remark && errors.remark}
                />
              </Grid>
              <Grid item xs={12}>
                {loading ? (
                  <Button className={t("class-btn-create")} fullWidth>
                    {t("loading")}
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    className={t("class-btn-create")}
                  >
                    {dialogTitle === "Update" ? t("update") : t("create")}
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
