import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
//Import from project
import { AuthContext } from "../../../Context/AuthContext";
import { CREATE_CLASS, UPDATE_CLASS } from "../../../Schema/Class";

const useClassForm = ({ handleClose, resetForm, setRefetch }) => {
  // Change Language
  const { setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [createClass] = useMutation(CREATE_CLASS, {
    onCompleted: ({ createClass }) => {
      setLoading(false);

      if (createClass?.isSuccess === true) {
        setAlert(true, "success", createClass?.message);
        handleClose();
        resetForm();
        setRefetch();
      } else {
        setAlert(true, "error", createClass?.message);
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageKh: message, messageEn: message });
    },
  });

  const [updateClass] = useMutation(UPDATE_CLASS, {
    onCompleted: ({ updateClass }) => {
      setLoading(false);
      if (updateClass?.isSuccess === true) {
        setAlert(true, "success", updateClass?.message);
        handleClose();
        resetForm();
        setRefetch();
      } else {
        setAlert(true, "error", updateClass?.message);
      }
    },
    onError: ({ message }) => {
      setLoading(false);
      setAlert(true, "error", { messageKh: message, messageEn: message });
    },
  });

  return { createClass, updateClass, loading, setLoading };
};

export default useClassForm;
