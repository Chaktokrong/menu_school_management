import React, { useState, useContext } from "react";
import {
  Stack,
  MenuList,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Status from "./Status";
import Popover from "@mui/material/Popover";
import EditIcon from "@mui/icons-material/Edit";
import ClassForm from "./ClassForm";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogDelete from "../../Utils/DialogDelete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../Context/AuthContext";
import { DELETE_CLASS } from "../../Schema/Class";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export default function ClassAction({ editData, setRefetch }) {
  // Change Language
  const { t, setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //Modal update
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleClose();
  };
  const handleCloseEdit = () => setOpenEdit(false);

  //Modal delete
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => {
    setOpenDel(true);
    handleClose();
  };
  const handleCloseDel = () => setOpenDel(false);

  //Modal update
  const [openStatus, setOpenStatus] = useState(false);
  const handleOpenStatus = () => {
    setOpenStatus(true);
    handleClose();
  };
  const handleCloseStatus = () => setOpenStatus(false);

  const [deleteClass] = useMutation(DELETE_CLASS, {
    onCompleted: ({ deleteClass }) => {
      // console.log("deleteClass :", deleteClass);
      setLoading(false);
      if (deleteClass?.isSuccess === true) {
        setAlert(true, "success", deleteClass?.message);
        handleCloseDel();
        setRefetch();
      } else {
        setAlert(true, "error", deleteClass?.message);
      }
    },
    onError: (error) => {
      console.log("Error", error?.message);
    },
  });

  const handleDelete = () => {
    deleteClass({
      variables: {
        id: editData?._id,
      },
    });
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "#131870" }} fontSize="small" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          {/* {!editData?.isComplete && (
            <MenuItem onClick={handleOpenStatus}>
              <ListItemIcon>
                <CheckBoxOutlinedIcon
                  fontSize="small"
                  sx={{ color: "green" }}
                />
              </ListItemIcon>
              <ListItemText>{t("thead_graduate")}</ListItemText>
            </MenuItem>
          )} */}

          <MenuItem onClick={handleOpenEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" sx={{ color: "#131870" }} />
            </ListItemIcon>
            <ListItemText>{t("update")}</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleOpenDel}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText> {t("delete")} </ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>

      {openEdit && (
        <ClassForm
          open={openEdit}
          dialogTitle={"Update"}
          editData={editData}
          setRefetch={setRefetch}
          handleClose={handleCloseEdit}
        />
      )}

      {openStatus && (
        <Status
          open={openStatus}
          editData={editData}
          setRefetch={setRefetch}
          handleClose={handleCloseStatus}
        />
      )}

      {openDel && (
        <DialogDelete
          open={openDel}
          handleClose={handleCloseDel}
          loading={loading}
          deleteTitle={t("modal_title_delete_class")}
          handleDelete={handleDelete}
          editData={editData}
        />
      )}
    </div>
  );
}
