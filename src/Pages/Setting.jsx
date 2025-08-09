import { useContext } from "react";
import { Grid, Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
//Srcs
import "./setting.scss";
import User from "../Assets/add-user.png";
import Shift from "../Assets/shift.png";
import GroupFee from "../Assets/groupfee.png";
import Course from "../Assets/course.png";
import Exam from "../Assets/exam-img.png";
import Subject from "../Assets/subject-img.png";
import { AuthContext } from "../Context/AuthContext";

export default function Setting() {
  // Change Language
  const { t } = useContext(AuthContext);
  const SettingData = [
    {
      icon: <img alt="Exam icon" className="image" src={User} />,
      path: "/setting/user",
      title: t("page_user"),
      description: t("thead_description_user"),
    },
    {
      icon: <img alt="Exam icon" className="image" src={GroupFee} />,
      path: "/setting/group-fee",
      title: t("page_group_fee"),
      description: t("thead_description_group_fee"),
    },
    {
      icon: <img alt="Exam icon" className="image" src={Shift} />,
      path: "/setting/shift",
      title: t("page_shift"),
      description: t("thead_description_shift"),
    },
    {
      icon: <img alt="Exam icon" className="image" src={Course} />,
      path: "/setting/course",
      title: t("page_course"),
      description: t("thead_description_course"),
    },
    {
      icon: <img alt="Exam icon" className="image" src={Subject} />,
      path: "/setting/subject",
      title: t("page_subject"),
      description: t("thead_description_subject"),
    },
    {
      icon: <img alt="Exam icon" className="image" src={Exam} />,
      path: "/setting/exam-type",
      title: t("page_exam_type"),
      description: t("thead_description_exam_type"),
    },
  ];

  return (
    <div className="setting-page">
      <Stack direction="row" spacing={2} className="page-header">
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography className="page-title">{t("page_setting")}</Typography>
        </Stack>
      </Stack>

      <Box sx={{ mt: "30px" }}>
        <Grid container spacing={4}>
          {SettingData?.map((e, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link to={e?.path} style={{ textDecoration: "none" }}>
                <Stack
                  spacing={3}
                  direction="row"
                  className="setting-page-container"
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    className="page-image"
                  >
                    {e?.icon}
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Stack direction="column">
                      <Typography className="page-title">{e?.title}</Typography>
                      <Typography className="page-description">
                        {e?.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
