import { useState, useContext } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IconButton, Stack, Box, Tooltip } from "@mui/material";
import { useMutation } from "@apollo/client";
import { FaKey } from "react-icons/fa6";
//Import from project
import "../../Style/actionstyle.scss";
import { useDeleteImageServer } from "../CropImage/DeleteImageServer";
import { AuthContext } from "../../Context/AuthContext";
import UpdateUser from "./UpdateUser";
import ChangeUserPassword from "./ChangeUserPassword";
import { DELETE_USER } from "../../Schema/User";
import DialogDelete from "../../Utils/DialogDelete";
import { hasPermission } from "../../Context/Permission";

export default function UserAction({ editData, setRefetch, userLogin }) {
  // Change Language
  const { t, setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  //Modal update
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  //Modal update
  const [openPassword, setOpenPassword] = useState(false);
  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => setOpenPassword(false);

  //Modal delete
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const mutationDelete = useDeleteImageServer();

  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      setLoading(false);
      if (deleteUser?.isSuccess === true) {
        setAlert(true, "success", deleteUser?.message);
        handleCloseDel();
        setRefetch();
        if (editData?.profile) {
          let splitSrc = editData?.profile?.split(":")[4];
          mutationDelete.mutate({
            storage: "sr_music_academy",
            folder: "sr_music_images",
            file: splitSrc.split("/")[0],
          });
        }
      } else {
        setAlert(true, "error", deleteUser?.message);
      }
    },
    onError: (error) => {
      console.log("Error", error?.message);
    },
  });

  const handleDelete = () => {
    deleteUser({
      variables: {
        id: editData?._id,
      },
    });
  };
 
  return (
    <div>
      <Stack direction="row" justifyContent="right">
        {hasPermission(
          userLogin?.user?.role,
          "change_password:change_password"
        ) && (
          <Tooltip title={t("modal_title_change_password")} placement="top">
            <IconButton onClick={handleOpenPassword}>
              <Box className="view-container">
                <FaKey className="view-icon" />
              </Box>
            </IconButton>
          </Tooltip>
        )}

        {hasPermission(userLogin?.user?.role, "update:user") && (
          <Tooltip title={t("update")} placement="top">
            <IconButton onClick={handleOpenEdit}>
              <Box className="update-container">
                <MdModeEdit className="update-icon" />
              </Box>
            </IconButton>
          </Tooltip>
        )}

        {hasPermission(userLogin?.user?.role, "delete:user") && (
          <Tooltip title={t("delete")} placement="top">
            <IconButton onClick={handleOpenDel}>
              <Box className="delete-container">
                <MdDelete className="delete-icon" />
              </Box>
            </IconButton>
          </Tooltip>
        )}
      </Stack>

      {openEdit && (
        <UpdateUser
          open={openEdit}
          handleClose={handleCloseEdit}
          editData={editData}
          setRefetch={setRefetch}
        />
      )}

      {openPassword && (
        <ChangeUserPassword
          open={openPassword}
          handleClose={handleClosePassword}
          editData={editData}
          // setRefetch={setRefetch}
        />
      )}

      {openDel && (
        <DialogDelete
          open={openDel}
          handleClose={handleCloseDel}
          loading={loading}
          deleteTitle={t("modal_title_delete_user")}
          handleDelete={handleDelete}
          editData={editData}
        />
      )}
    </div>
  );
}
