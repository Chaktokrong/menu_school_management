import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLASS_BY_TEACHER_ID } from "../Schema/Class";

const useGetClassByTeacherId = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState([]); 
  const { refetch } = useQuery(GET_CLASS_BY_TEACHER_ID, {
    variables: {
      teacherId: id,
    },
    onCompleted: ({ getClassByTeacherId }) => {
      setClassData(getClassByTeacherId || []);
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [id]);

  return { classData, loading, refetch };
};

export default useGetClassByTeacherId;
