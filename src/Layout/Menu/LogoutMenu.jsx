import React, { useContext, useState } from "react";
import {
  Stack,
  IconButton,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CircularProgress from "@mui/material/CircularProgress";
//Import From Project
import "../../Style/dialogstyle.scss";
import { AuthContext } from "../../Context/AuthContext";

export default function LogoutMenu({ open, anchorEl, handleClose }) {
  const [iconReload, setIconReload] = useState(false);
  const { dispatch } = useContext(AuthContext);

  //======================== function logout ===================
  const handleLogout = async () => {
    setTimeout(() => {
      handleClose();
      setIconReload(true);
      //============= remove token ======================
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("userLogin");
      window.localStorage.removeItem("userStatus");
      dispatch({
        type: "LOGGED_IN_USER",
        payload: null,
      });
      window.location.reload("/login");
    }, 1000);
  };

  // return (
  //   <Dialog className="dialog-container" open={open} fullWidth maxWidth="xs">
  //     <DialogTitle sx={{ padding: "10px 20px" }}>
  //       <Stack direction="row" spacing={2}>
  //         <Stack direction="column" justifyContent="center">
  //           <Typography className="dialog-title">Loggin out?</Typography>
  //         </Stack>
  //         <Box sx={{ flexGrow: 1 }} />
  //         <IconButton onClick={handleClose}>
  //           <DoDisturbOnOutlinedIcon className="close-icon" />
  //         </IconButton>
  //       </Stack>
  //     </DialogTitle>

  //     <DialogContent dividers>
  //       <Stack direction="column" justifyContent="space-between" height="140px">
  //         <Stack direction="column" justifyContent="center" height="90px">
  //           <Stack direction="column" spacing={0}>
  //             <Typography className="logout-title">
  //               You are attemping to log out!
  //             </Typography>
  //             <Typography className="logout-des">Are you sure?</Typography>
  //           </Stack>
  //         </Stack>

  //         {iconReload ? (
  //           <Button
  //             className="btn-create"
  //             fullWidth
  //             endIcon={
  //               iconReload ? (
  //                 <CircularProgress sx={{ color: "#fff" }} size="20px" />
  //               ) : null
  //             }
  //           >
  //             Loading...
  //           </Button>
  //         ) : (
  //           <Button className="btn-create" fullWidth onClick={handleLogout}>
  //             Log Out
  //           </Button>
  //         )}
  //       </Stack>
  //     </DialogContent>
  //   </Dialog>
  // );

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      slotProps={{
        list: {
          "aria-labelledby": "basic-button",
        },
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}
