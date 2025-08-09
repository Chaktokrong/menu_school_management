import { Box, Grid } from "@mui/material";
//import from projects
import "./dashboard.scss";
import HeaderCard from "../Components/Dashboard/HeaderCard";
import TotalAttendance from "../Components/Dashboard/TotalAttendance";
import TotalStudentByGender from "../Components/Dashboard/TotalStudentByGender";
import TotalRevenueByType from "../Components/Dashboard/TotalRevenueByType";
import StudentCompleteClass from "../Components/Dashboard/StudentCompleteClass";
import StudentTbale from "../Components/Dashboard/StudentTbale";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <Box className="body-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <HeaderCard />
          </Grid>
{/* 
          <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
            <TotalAttendance />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={5} xl={3}>
            <TotalStudentByGender />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={5} xl={3}>
            <StudentCompleteClass />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <TotalRevenueByType />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <StudentCompleteClass />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
            <StudentCompleteClass />
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}
