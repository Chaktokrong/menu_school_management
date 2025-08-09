import { useState, useContext } from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import moment from "moment";
//Srcs
import "./dashboardstyle.scss";
import "../../Style/pagestyle.scss";
import EmptyData from "../../Components/Include/EmptyData/EmptyData";
import LoadingPage from "../../Utils/LoadingPage";
import { AuthContext } from "../../Context/AuthContext";

export default function StudentTbale() {
  const { t } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const tableData = [];

  return (
    <div className="chart-container">
      <Stack direction="column" spacing={4}>
        <Typography className="chart-title">Management Value</Typography>

        <Stack direction="column" spacing={1.5}>
          {[1, 2, 3].map((row, index) => {
            return (
              <Stack
                direction="row"
                spacing={1.4}
                key={index}
                className="student-card"
              >
                <Stack direction="column" justifyContent="center">
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    alt={row?.studentName}
                    src={row?.profile}
                  />
                </Stack>
                <Stack direction="column" justifyContent="center">
                  <Typography className="student-name">
                    Scarllet Johanson
                  </Typography>
                  <Typography className="student-status">status now</Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </div>
  );
}
