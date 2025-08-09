import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import { Outlet, useLocation } from "react-router-dom";
import { Stack, Box } from "@mui/material";
//Import from project
import "./layout.scss";
import Menu from "./Menu/Menu";
import TopNavbar from "./TopNavbar";
import { AuthContext } from "../Context/AuthContext";
// import { GET_USER_LOGIN } from "../Schema/User";

export default function Layout() {
  let location = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [openMobile] = useState(false);

  // =========================== Resize width ================================
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  //============================ get user login =================================
  // const { refetch } = useQuery(GET_USER_LOGIN, {
  //   pollInterval: 1000,
  //   onCompleted: ({ getUserLogin }) => {
  //     setWidth(window.innerWidth);
  //     if (!getUserLogin?.user) {
  //       window.localStorage.removeItem("userLogin");
  //       window.localStorage.removeItem("token");
  //       window.localStorage.removeItem("role");
  //       dispatch({
  //         type: "LOGGED_IN_USER",
  //         payload: null,
  //       });
  //       window.location.reload(false);
  //       navigate("/login");
  //     }
  //   },
  //   onError: (error) => {
  //     console.log("error::", error);
  //     setWidth(window.innerWidth);
  //     let result =
  //       error.message.includes("Unauthorized!") ||
  //       error.message.includes("Your session expired!");
  //     if (result) {
  //       window.localStorage.removeItem("userLogin");
  //       window.localStorage.removeItem("token");
  //       window.localStorage.removeItem("role");
  //       dispatch({
  //         type: "LOGGED_IN_USER",
  //         payload: null,
  //       });
  //       window.location.reload(false);
  //       navigate("/login");
  //     }
  //   },
  // });

  // useEffect(() => {
  //   refetch();
  // }, []);

  return (
    <div className="layout-container">
      {/* <Stack direction="row">
        <Menu />

        <Main open={open} className="outlet-container">
          <Outlet />
        </Main>
      </Stack> */}

      <Stack direction="row">
        <Box sx={{ width: "19%" }} className="navbar-container">
          <Menu />
        </Box>

        <Box className="left-side-container">
          <Stack
            direction="column"
            spacing="2"
            className="supLeft-side-container"
          >
            <TopNavbar />

            <Box className="outlet-container">
              {/* <Box sx={{ height: "100px", borderRight: "2px solid red" }} /> */}
              <Outlet />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
