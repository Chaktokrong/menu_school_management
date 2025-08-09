import { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../Context/AuthContext";
import { CHECK_STUDENT_HOMEWROK } from "../Schema/HomeWork";

const useCheckStudentHomework = ({ setRefetch }) => {
  // Change Language
  const { setAlert } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [checkStudentHomework] = useMutation(CHECK_STUDENT_HOMEWROK, {
    onCompleted: ({ checkStudentHomework }) => {
      // console.log("onCompleted :", checkStudentHomework);
      if (!checkStudentHomework?.isSuccess) {
        setAlert(true, "error", checkStudentHomework?.message);
      }
      setRefetch();
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  const handleSubmit = (variables) => {
    // console.log("variables :", variables);
    checkStudentHomework({
      variables: variables,
    });
  };

  return { handleSubmit, loading };
};

export default useCheckStudentHomework;
