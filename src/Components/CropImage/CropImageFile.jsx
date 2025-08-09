import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  Box,
  Button,
  Slider,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CropIcon from "@mui/icons-material/Crop";
import Cropper from "react-easy-crop";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import GoglobalStoreage from "goglobalstoragenpm";
//Srcs
import "./cropimagefile.scss";
import getCroppedImg from "./Crop";

export default function CropImageFile({
  setProgress,
  setStatusProgress,
  openCrop,
  setOpenCrop,
  photoURL,
  setPhotoURL,
  setImageFile,
  setProfileHook,
}) {
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  let goglobalStoreage = new GoglobalStoreage();
  useEffect(() => {
    goglobalStoreage.createClient(
      "684fccd2872e8a3dd3330ef4",
      "1A1TVysKmA7xFNFpelNs5uqIwSXXLP4zjODwWMqKGhp"
    );
  }, []);

  const newDate = moment(new Date()).format("MMdYYYY");

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setLoading(true);

      setTimeout(() => {
        setPhotoURL(url);
        setImageFile(file);
        setOpenCrop(false);

        setStatusProgress(true);
        setProgress(10);
        uploadImage(file);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // compress image in customer
  const uploadImage = async (file) => {
    if (!file) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    let newName = `${uuidv4()}${newDate}${file.name.split(".").pop()}`;
    var newFile = new File([compressedFile], `${newName}.png`, {
      type: "image/png",
    });

    goglobalStoreage.upload("sr_music_academy", "sr_music_images", newFile, "");
    
    setProfileHook(
      `${process.env.REACT_APP_IMAGE_SERVER}fileName:${newName}.png${process.env.REACT_APP_IMAGE_URL}`
    );
  };

  return (
    <Dialog open={openCrop} fullWidth maxWidth="sm" className="crop-container">
      <DialogTitle sx={{ padding: "10px 20px" }}>
        <Stack direction="row" spacing={2}>
          <Stack direction="column" justifyContent="center">
            <Typography className="dialog-title">Crop Image</Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={() => {
              setImageFile("");
              setOpenCrop(false);
            }}
          >
            <CloseIcon className="close-icon" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers className="dialog-content">
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={2.6 / 3}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + "°"}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => {
              setImageFile("");
              setOpenCrop(false);
            }}
          >
            Cancel
          </Button>
          {loading ? (
            <Button variant="contained" startIcon={<CropIcon />}>
              Uploading...
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<CropIcon />}
              onClick={cropImage}
            >
              Crop
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
