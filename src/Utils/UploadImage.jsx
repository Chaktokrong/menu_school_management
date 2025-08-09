import { useState, useContext } from "react";
import {
  Box,
  Stack,
  Button,
  Tooltip,
  TextField,
  Typography,
} from "@mui/material";
import EmptyImage from "../Assets/empty-image.png";
import CropImageFile from "../Components/CropImage/CropImageFile";
import LoadingProgess from "../Utils/LoadingProgress";
import { AuthContext } from "../Context/AuthContext";

const UploadImage = ({ editData, imageFile, setImageFile, setProfileHook }) => {
  const { t } = useContext(AuthContext);

  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [statusProgress, setStatusProgress] = useState(false);
  const [progress, setProgress] = useState(10);

  const handleUploadImage = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageFile(imageFile);
      setPhotoURL(URL.createObjectURL(imageFile));
      setOpenCrop(true);
    }
  };

  return (
    <div>
      {!openCrop ? (
        <Box>
          <Stack direction="row" justifyContent="center">
            <Tooltip title="click to upload">
              <Button component="label">
                <TextField
                  type="file"
                  id="image"
                  sx={{ display: "none" }}
                  onChange={handleUploadImage}
                />
                <img
                  className="avater-image"
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : editData?.profile
                      ? editData?.profile
                      : EmptyImage
                  }
                />
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      ) : (
        <CropImageFile
          setProgress={setProgress}
          setStatusProgress={setStatusProgress}
          openCrop={openCrop}
          setOpenCrop={setOpenCrop}
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
          setImageFile={setImageFile}
          setProfileHook={setProfileHook}
        />
      )}

      {statusProgress && progress < 100 ? (
        <LoadingProgess progress={progress} setProgress={setProgress} />
      ) : (
        <Typography
          className={t("class-name-field-title")}
          sx={{ textAlign: "center" }}
        >
          {t("thead_profile")}
        </Typography>
      )}
    </div>
  );
};

export default UploadImage;
