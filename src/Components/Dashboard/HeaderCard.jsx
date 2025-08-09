import { useContext } from "react";
import { Grid, Stack, Typography } from "@mui/material";
//Import from project
import StudentIcon from "../../Assets/icon_dasboard/graduation.png";
import TeacherIcon from "../../Assets/icon_dasboard/business.png";
import ClassIcon from "../../Assets/icon_dasboard/music.png";
import OweIcon from "../../Assets/icon_dasboard/recurring_owe.png";
import RevenueIcon from "../../Assets/icon_dasboard/recurring.png";
import "./dashboardstyle.scss";
// import InvoiceImage from "../../Assets/new-dashboard/invoice-img.png";
// import OweImage from "../../Assets/new-dashboard/income-img.png";
import { currencyFormat } from "../../Function/DynamicFn";
import { AuthContext } from "../../Context/AuthContext";
import useGetHeaderCard from "../../Hooks/useGetHeaderCard";

const HeaderCard = () => {
  // Change Language
  const { t } = useContext(AuthContext);

  const { tableData } = useGetHeaderCard();

  // console.log("tableData::", tableData);

  const headerData = [
    {
      cardName: t("total_student"),
      total: tableData?.totalStudent,
      icon: StudentIcon,
      className: "first",
    },
    {
      cardName: t("total_teacher"),
      total: tableData?.totalTeacher,
      icon: TeacherIcon,
      className: "second",
    },
    // {
    //   cardName: t("total_class"),
    //   total: tableData?.totalClass,
    //   icon: ClassIcon,
    //   className: "third",
    // },
    {
      cardName: t("total_owe"),
      total: currencyFormat(tableData?.totalOwe),
      icon: OweIcon,
      className: "fourth",
    },
    {
      cardName: t("total_revenue"),
      total: currencyFormat(tableData?.totalRevenue),
      icon: RevenueIcon,
      className: "fifth",
    },
  ];

  return (
    <div className="card-container">
      <Grid container spacing={3}>
        {headerData?.map((data, index) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
              <Stack
                direction="row"
                justifyContent="space-between"
                className={`stack-container-${data?.className}`}
              >
                <Stack direction="column" justifyContent="space-between">
                  <Typography className="text-number">
                    {index === 3 || index === 4 ? "$ " : ""}
                    {data?.total}
                  </Typography>
                  <Typography className="text-title">
                    {data?.cardName}
                  </Typography>
                </Stack>

                <Stack direction="column" justifyContent="center">
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="icon-container"
                  >
                    <img
                      src={data?.icon}
                      alt="ThirdShareImg"
                      className="front-icon"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default HeaderCard;
