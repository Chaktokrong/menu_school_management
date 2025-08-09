import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLASS_BY_ID } from "../Schema/Class";

const useGetClassById = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState();

  const { refetch } = useQuery(GET_CLASS_BY_ID, {
    variables: {
      id: id,
    },
    onCompleted: ({ getClassById }) => { 
      setClassData(getClassById);
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

export default useGetClassById;
