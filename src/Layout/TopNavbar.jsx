import { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
//Icons
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import { IoMdMenu } from "react-icons/io";
//Import from project
import "./layout.scss";
// import MenuNavbarMobile from "./MenuNavbarMobile";
// import LogoutMenu from "./LogoutMenu";

export default function TopNavbar({ handleDrawerOpen, open }) {
  const [userLogin, setUserLogin] = useState();
  // console.log("userLogin::", userLogin)
  useEffect(() => {
    // Get data from localStorage when the component mounts
    const storedData = JSON.parse(localStorage.getItem("userLogin"));
    if (storedData) {
      setUserLogin(storedData);
    }
  }, []);

  // ================== Function menu logout ===================
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ================== Function open logout ===================
  const [oepnLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = () => {
    setOpenLogout(true);
    handleClose();
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  return (
    <Toolbar className="top-bar">
      <Stack
        direction="row"
        spacing={1}
        sx={{ width: "100%", height: "60px" }}
        justifyContent="space-between"
      >
        <Stack direction="column" justifyContent="center">
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <IoMdMenu style={{ color: "#0f81c2" }} />
          </IconButton> */}
        </Stack>

        <Stack direction="row" spacing={1.4} justifyContent="right">
          <Stack direction="column" justifyContent="center">
            <Button className="btn-menu" onClick={handleClick}>
              <Stack direction="row" spacing={1}>
                <Stack direction="column" justifyContent="center">
                  <Avatar
                    src={userLogin?.userProfile ? userLogin?.userProfile : ""}
                    alt="User"
                    className="avatar-user"
                  />
                </Stack>
                <Stack direction="column" justifyContent="center">
                  <Typography className="username-text">
                    {userLogin !== undefined && userLogin !== ""
                      ? userLogin?.userName
                      : "User Log"}
                  </Typography>
                </Stack>
                <Stack direction="column" justifyContent="center">
                  {openMenu ? (
                    <ArrowDropDownIcon className="icon-menu" />
                  ) : (
                    <ArrowDropUpIcon className="icon-menu" />
                  )}
                </Stack>
              </Stack>
            </Button>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleOpenLogout}>Logout </MenuItem>
            </Menu>

            {/* <LogoutMenu open={oepnLogout} handleClose={handleCloseLogout} /> */}
          </Stack>
        </Stack>
      </Stack>
    </Toolbar>
  );
}
