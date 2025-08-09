import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
//import from project
import "./dashboardstyle.scss";
import { AuthContext } from "../../Context/AuthContext";
import useGetTotalStudentByGender from "../../Hooks/useGetTotalStudentByGender";

export default function TotalStudentByGender() {
  const { t } = useContext(AuthContext);
  const colors = ["#4b50b6", "#4dc4d9", "#6a62f3", "#f19251", "#40d388"];

  const { tableData } = useGetTotalStudentByGender();

  const state = {
    series: [
      tableData?.totalFemale,
      tableData?.totalMale,
      // tableData?.totalStudent,
    ],
    options: {
      chart: {
        type: "donut",
      },
      labels: [
        "Female",
        "Male",
        // "Total"
      ],
      colors,
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return `${opts.w.config.labels[opts.seriesIndex]}: ${val.toFixed(
            0
          )}%`;
        },
        style: {
          fontSize: "14px",
        },
      },
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Stack className="chart-container" direction="column" spacing={3}>
      <Typography className={t("chart-title")}>{t("total_student")}</Typography>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height={350}
        />
      </div>
    </Stack>
  );
}
