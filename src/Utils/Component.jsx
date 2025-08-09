import { useContext } from "react";
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//Icons
import { BiMinusCircle } from "react-icons/bi";
import SearchIcon from "@mui/icons-material/Search";
//Import from project
import CreateIcon from "../Assets/create-icon.svg";
import { AuthContext } from "../Context/AuthContext";

//====================================== Search TextField ====================================
export const SearchTextField = ({ handleSearch, className, placeholder }) => {
  const { t } = useContext(AuthContext);
  return (
    <TextField
      size="small"
      placeholder={placeholder ? placeholder : t("search")}
      className={className}
      onChange={(e) => handleSearch(e)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ mr: 1 }}>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

//====================================== Button Create ====================================
export const ButtonCreate = ({
  handleOpen,
  classBtn,
  classIcon,
  title,
  loading,
  disabled,
  icon,
}) => {
  // Change Language
  const { t } = useContext(AuthContext);

  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      justifyContent="flex-end"
      sx={{ width: "100%", height: "100%" }}
    >
      <Box>
        {loading ? (
          <Button
            className={classBtn}
            startIcon={
              icon ? (
                icon
              ) : (
                <img src={CreateIcon} alt="CreateIcon" className={classIcon} />
              )
            }
          >
            {t("loading")}
          </Button>
        ) : (
          <Button
            disabled={disabled ? true : false}
            onClick={handleOpen}
            className={classBtn}
            startIcon={
              icon ? (
                icon
              ) : (
                <img src={CreateIcon} alt="CreateIcon" className={classIcon} />
              )
            }
            sx={{ whiteSpace: "pre" }}
          >
            {title ? title : t("create")}
          </Button>
        )}
      </Box>
    </Stack>
  );
};

//====================================== Dialog Title ====================================
export const DialogTitleComp = ({
  title,
  classIcon,
  classTitle,
  handleClose,
}) => {
  return (
    <DialogTitle sx={{ padding: "10px 20px" }}>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography className={classTitle}>{title}</Typography>
        <IconButton onClick={handleClose}>
          <BiMinusCircle className={classIcon} />
        </IconButton>
      </Stack>
    </DialogTitle>
  );
};

//====================================== Page header ====================================
export const PageHeaderTitle = ({
  routeTo,
  pageTitle,
  detailTitle,
  classPage,
  classSlash,
}) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {pageTitle && <Box className="slash" />}
      {pageTitle && (
        <Typography
          className={classPage}
          onClick={() => routeTo && navigate(routeTo)}
        >
          {pageTitle}
        </Typography>
      )}
      {detailTitle && <Typography className={classSlash}>/</Typography>}
      {detailTitle && (
        <Typography className={classPage}>{detailTitle}</Typography>
      )}
    </Stack>
  );
};
