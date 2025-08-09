import { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { CHECK_STUDENT_ATTENDANCE } from "../Schema/Class";
import { AuthContext } from "../Context/AuthContext";

const useCheckStudentAttendance = ({
  date,
  classId,
  studentId,
  setRefetch,
}) => {
  // Change Language
  const { setAlert } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [checkStudentAttendance] = useMutation(CHECK_STUDENT_ATTENDANCE, {
    onCompleted: ({ checkStudentAttendance }) => {
      if (!checkStudentAttendance?.isSuccess) {
        setAlert(true, "error", checkStudentAttendance?.message);
      }
      setRefetch();
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  const handleSubmit = (status, reason) => {
    checkStudentAttendance({
      variables: {
        date: date,
        status: status,
        reason: reason,
        classId: classId,
        studentId: studentId,
      },
    });
  };

  return { handleSubmit, loading };
};

export default useCheckStudentAttendance;
