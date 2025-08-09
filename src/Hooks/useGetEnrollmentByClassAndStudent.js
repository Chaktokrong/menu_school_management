import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ENROLLMENT_BY_CLASS_AND_STUDENT } from "../Schema/Class";

const useGetEnrollmentByClassAndStudent = (variables) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState({});
  // console.log("variables:", variables);
  const { refetch } = useQuery(GET_ENROLLMENT_BY_CLASS_AND_STUDENT, {
    variables: variables,
    onCompleted: ({ getEnrollmentByClassAndStudent }) => {
      // console.log("getEnrollmentByClassAndStudent :" , getEnrollmentByClassAndStudent)
      setTableData(getEnrollmentByClassAndStudent);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  return { tableData, loading, refetch };
};

export default useGetEnrollmentByClassAndStudent;
