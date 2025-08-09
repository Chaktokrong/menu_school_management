import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENT_BY_id } from "../Schema/Student";

const useGetStudentById = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const { refetch } = useQuery(GET_STUDENT_BY_id, {
    variables: {
      id: id,
    },
    onCompleted: ({ getStudentById }) => {
      setStudentData(getStudentById);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return { studentData, loading, refetch };
};

export default useGetStudentById;
