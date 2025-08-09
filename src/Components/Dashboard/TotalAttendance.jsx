import React, { useState, useContext } from "react";
import { Stack, Box, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
//import from project
import "./dashboardstyle.scss";
import { AuthContext } from "../../Context/AuthContext";
import EmptyData from "../Include/EmptyData/EmptyData";
import LoadingPage from "../../Utils/LoadingPage";
import useGetAttendanceByType from "../../Hooks/useGetAttendanceByType";

export default function TotalAttendance() {
  const { t } = useContext(AuthContext);
  const colors = ["#4b50b6", "#4dc4d9", "#6a62f3", "#f19251", "#40d388"];

  const [fitlerType, setFitlerType] = useState("month");

  const { loading, tableData } = useGetAttendanceByType({ fitlerType });

  const categories = tableData?.map((data) => data?.name);
  const totalPresent = tableData?.map((data) => data?.totalPresent);
  const totalLate = tableData?.map((data) => data?.totalLate);
  const totalPermission = tableData?.map((data) => data?.totalPermission);
  const totalAbsent = tableData?.map((data) => data?.totalAbsent);

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    colors: colors,
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#666",
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },
    xaxis: {
      categories: categories,
    },
    // yaxis: {
    //   min: 0,
    //   max: 120,
    //   tickAmount: 6,
    // },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  // console.log("tableData::", tableData)

  const series = [
    {
      name: "Present",
      data: totalPresent,
    },
    {
      name: "Late",
      data: totalLate,
    },
    {
      name: "Permission",
      data: totalPermission,
    },
    {
      name: "Absent",
      data: totalAbsent,
    },
  ];

  const attStatus = ["month", "year"];

  return (
    <Stack className="chart-container" direction="column" spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography className={t("chart-title")}>
          {t("total_attendance")}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {attStatus.map((data, index) => {
            return (
              <Box
                className="att-card-status"
                key={data}
                onClick={() => setFitlerType(data)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: fitlerType === data ? colors[index] : "#fff",
                  border: `2px solid ${colors[index]}`,
                  color: fitlerType === data ? "#fff" : colors[index],
                }}
              >
                {data === "month" ? "Month" : "Year"}
              </Box>
            );
          })}
        </Stack>
      </Stack>

      {loading ? (
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ height: "360px" }}
        >
          <LoadingPage />
        </Stack>
      ) : tableData?.length > 1 ? (
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={340}
          />
        </div>
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ height: "360px" }}
        >
          <EmptyData />
        </Stack>
      )}
    </Stack>
  );
}
