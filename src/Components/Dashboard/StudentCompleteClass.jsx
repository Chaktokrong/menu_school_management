import { useState, useContext } from "react";
import { Stack, Avatar, Typography, Box, Button } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
//Srcs
import "./dashboardstyle.scss";
import "../../Style/pagestyle.scss";
import EmptyData from "../Include/EmptyData/EmptyData";
import LoadingPage from "../../Utils/LoadingPage";
import { AuthContext } from "../../Context/AuthContext";
import useGetStudentCompleteClass from "../../Hooks/useGetStudentCompleteClass";
import FooterPagination from "../../Utils/FooterPagination";

export default function StudentCompleteClass() {
  const { t } = useContext(AuthContext);
  let navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 4;
  const { loading, tableData, totalCount } = useGetStudentCompleteClass({
    page,
    limit,
  });

  // console.log("totalCount::", totalCount);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="chart-container">
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack direction="column" spacing={4}>
          <Typography className={t("chart-title")}>
            {t("student_complete_class")}
          </Typography>

          {loading ? (
            <Stack
              direction="column"
              justifyContent="center"
              sx={{ height: "300px" }}
            >
              <LoadingPage />
            </Stack>
          ) : (
            <Stack direction="column" spacing={1}>
              {tableData?.map((row, index) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    key={index}
                    className="student-card"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/class/class-detail?classId=${row?.classId?._id}`
                      )
                    }
                  >
                    <Stack direction="row" spacing={1.4}>
                      <Stack direction="column" justifyContent="center">
                        <Avatar
                          sx={{ width: 40, height: 40 }}
                          alt={row?.studentId?.studentName}
                          src={row?.studentId?.profile}
                        />
                      </Stack>
                      <Stack direction="column" justifyContent="center">
                        <Typography className="student-name">
                          {row?.studentId?.familyName +
                            " " +
                            row?.studentId?.studentName}
                        </Typography>
                        <Typography className="student-status">
                          {row?.studentId?.gender}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack direction="column" justifyContent="center">
                      <Typography className="class-name">
                        {row?.classId?.courseId?.enName +
                          " " +
                          row?.classId?.className}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          )}
        </Stack>

        {/* ==================== Pagination  ============================= */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            className="btn-next"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button
            className="btn-next"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
