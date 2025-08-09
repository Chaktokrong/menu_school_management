import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEACHER_BY_id } from "../Schema/User";

const useGetTeacherById = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);
  const { refetch } = useQuery(GET_TEACHER_BY_id, {
    variables: {
      id: id,
    },
    onCompleted: ({ getTeacherById }) => {
      setStudentData(getTeacherById);
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

export default useGetTeacherById;
