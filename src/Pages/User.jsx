import { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Stack,
  Table,
  Select,
  Avatar,
  MenuItem,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  FormControl,
  TableContainer,
} from "@mui/material";
//Srcs
import "../Style/pagestyle.scss";
import EmptyData from "../Components/Include/EmptyData/EmptyData";
import CreateUser from "../Components/User/CreateUser";
import UserAction from "../Components/User/UserAction";
import LoadingPage from "../Utils/LoadingPage";
import FooterPagination from "../Utils/FooterPagination";
import {
  ButtonCreate,
  SearchTextField,
  PageHeaderTitle,
} from "../Utils/Component";
import { AuthContext } from "../Context/AuthContext";
import useWithDimension from "../Hooks/useWithDimension";
import useGetUserPagination from "../Hooks/useGetUserPagination";
import { hasPermission } from "../Context/Permission";

export default function User() {
  const { t } = useContext(AuthContext);

  const userLogin = JSON.parse(window.localStorage.getItem("userLogin"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [role, setRole] = useState("All");

  const {
    page,
    limit,
    loading,
    refetch,
    setPage,
    tableData,
    setLoading,
    handleLimit,
    handleSearch,
    paginationData,
  } = useGetUserPagination({ role: role });

  // ======================= Resize width Screen ======================
  const { width } = useWithDimension();
  return (
    <div className="page-container">
      <PageHeaderTitle
        classPage={t("class-page-title")}
        classSlash="slash-title"
        routeTo={"/setting"}
        pageTitle={t("page_setting")}
        detailTitle={t("page_user")}
      />

      <Box sx={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
            <Typography className={t("class-name-text-field-title")}>
              {t("search")}
            </Typography>
            <SearchTextField
              className={"text-field"}
              handleSearch={handleSearch}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={4} lg={3} xl={2}>
            <Typography className={t("class-name-text-field-title")}>
              {t("thead_select_role")}
            </Typography>
            <FormControl className={"text-field"} fullWidth size="small">
              <Select value={role} onChange={(e) => setRole(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"SuperAdmin"}>Super Admin</MenuItem>
                <MenuItem value={"Teacher"}>Teacher</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={6} xl={8}>
            {hasPermission(userLogin?.user?.role, "create:user") && (
              <ButtonCreate
                handleOpen={handleOpen}
                classBtn={"btn-create"}
                classIcon={"icon-add"}
              />
            )}

            {open && (
              <CreateUser
                open={open}
                handleClose={handleClose}
                setRefetch={refetch}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      <Box className="body-container">
        <TableContainer sx={{ maxWidth: `${width}px` }}>
          <Table className="table" aria-label="simple table">
            <TableHead className="header-row ">
              <TableRow>
                <TableCell
                  className={t("class-name-header-title-start")}
                  width="4%"
                >
                  {t("no")}
                </TableCell>
                <TableCell className={t("class-name-header-title")} width="17%">
                  {t("thead_username")}
                </TableCell>
                <TableCell className={t("class-name-header-title")} width="17%">
                  {t("thead_gender")}
                </TableCell>
                <TableCell className={t("class-name-header-title")} width="30%">
                  {t("thead_email")}
                </TableCell>
                <TableCell className={t("class-name-header-title")} width="25%">
                  {t("thead_role")}
                </TableCell>
                <TableCell
                  className={t("class-name-header-title-end")}
                  width="7%"
                ></TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody className="body">
                <TableRow className="body-row">
                  <TableCell
                    colSpan={6}
                    className="body-cell"
                    sx={{ bgcolor: "#fff" }}
                  >
                    <LoadingPage />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <>
                {tableData?.length === 0 || tableData?.length === undefined ? (
                  <TableBody className="body">
                    <TableRow className="body-row">
                      <TableCell colSpan={6} className="body-cell">
                        <EmptyData />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <>
                    <TableBody className="body">
                      {tableData?.map((row, index) => {
                        return (
                          <TableRow className="body-row" key={index}>
                            <TableCell className="body-cell-start">
                              {index + paginationData?.slNo}
                            </TableCell>
                            <TableCell className="body-cell">
                              <Stack direction="row" spacing={1.4}>
                                <Stack
                                  direction="column"
                                  justifyContent="center"
                                >
                                  <Avatar
                                    sx={{ width: 40, height: 40 }}
                                    alt={row?.userName}
                                    src={row?.profile}
                                  />
                                </Stack>
                                <Stack
                                  direction="column"
                                  justifyContent="center"
                                >
                                  <Typography className="student-name">
                                    {row?.familyName + " " + row?.userName}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell className="body-cell">
                              {row?.gender === "Male"
                                ? t("thead_male")
                                : t("thead_female")}
                            </TableCell>
                            <TableCell className="body-cell">
                              {row?.email}
                            </TableCell>
                            <TableCell className="body-cell">
                              {row?.role}
                            </TableCell>
                            <TableCell className="body-cell-end" align="right">
                              <UserAction
                                editData={row}
                                setRefetch={refetch}
                                userLogin={userLogin}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </>
                )}
              </>
            )}
          </Table>
        </TableContainer>

        {/* ==================== Pagination  ============================= */}
        <FooterPagination
          totalPages={paginationData?.totalPages}
          totalDocs={paginationData?.totalDocs}
          limit={limit}
          page={page}
          setPage={setPage}
          handleLimit={handleLimit}
          setLoading={setLoading}
        />
      </Box>
    </div>
  );
}
