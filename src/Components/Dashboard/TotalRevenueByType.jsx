import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
//import from project
import "./dashboardstyle.scss";
// import EmptyData from "../Include/EmptyData/EmptyData";
import LoadingPage from "../../Utils/LoadingPage";
// import { currencyFormat } from "../../Function/DynamicFn";
import useGetTotalRevenueByType from "../../Hooks/useGetTotalRevenueByType";
import { AuthContext } from "../../Context/AuthContext";

export default function TotalRevenueByType() {
  const { t } = useContext(AuthContext);
  const { loading, tableData } = useGetTotalRevenueByType();

  // console.log("tableData::", tableData);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return "$ " + val;
        //  return "$ " + currencyFormat(val);
      },
    },
  };

  const series = [
    {
      data: [
        {
          x: "Direct Class",
          y: tableData?.totalByDirectClass,
          fillColor: "#4b50b6",
        },
        {
          x: "Online Class",
          y: tableData?.totalByOnlineClass,
          fillColor: "#4dc4d9",
        },
        { x: "Book", y: tableData?.totalByBook, fillColor: "#6a62f3" },
        {
          x: "Instrument",
          y: tableData?.totalByInstrument,
          fillColor: "#f19251",
        },
      ],
    },
  ];

  return (
    <Stack className="chart-container" direction="column" spacing={2}>
      <Typography className="chart-title">{t("total_revenue")}</Typography>

      {loading ? (
        <Stack
          direction="column"
          justifyContent="center"
          sx={{ height: "360px" }}
        >
          <LoadingPage />
        </Stack>
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={340}
        />
      )}
    </Stack>
  );
}
