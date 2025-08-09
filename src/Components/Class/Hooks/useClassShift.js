import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
//Import from project
import { AuthContext } from "../../../Context/AuthContext";
import { DELETE_SHIFT } from "../../../Schema/Shift";

const useClassShift = ({ handleClose, setRefetch, id }) => {
  // Change Language
  const { setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [deleteShift] = useMutation(DELETE_SHIFT, {
    onCompleted: ({ deleteShift }) => {
      setLoading(false);
      if (deleteShift?.isSuccess === true) {
        setAlert(true, "success", deleteShift?.message);
        handleClose();
        setRefetch();
      } else {
        setAlert(true, "error", deleteShift?.message);
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageKh: message, messageEn: message });
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteShift({
      variables: {
        id: id,
      },
    });
  };

  return { deleteShift, loading, setLoading, handleDelete };
};

export default useClassShift;
