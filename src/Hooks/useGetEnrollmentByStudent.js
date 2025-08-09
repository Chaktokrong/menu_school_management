import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ENROLL_MENT_BY_STUDENT } from "../Schema/Student";

const useGetEnrollmentByStudent = ({ id, status }) => {
  //
  const [loading, setLoading] = useState(true);
  const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);

  //
  const { refetch } = useQuery(GET_ENROLL_MENT_BY_STUDENT, {
    variables: {
      studentId: id,
      status: status,
    },
    onCompleted: ({ getEnrollmentByStudent }) => {
      // console.log("getEnrollmentByStudent::", getEnrollmentByStudent)
      setStudentEnrollmentData(getEnrollmentByStudent);
      setLoading(false);
    },
    onError: (err) => {
      console.log("getEnrollmentByStudent Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [id, status]);

  return { studentEnrollmentData, loading, refetch };
};

export default useGetEnrollmentByStudent;
