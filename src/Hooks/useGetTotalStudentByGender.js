import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOTAL_STUDENT_BY_GENDER } from "../Schema/Dashboard";

const useGetTotalStudentByGender = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { refetch } = useQuery(GET_TOTAL_STUDENT_BY_GENDER, {
    onCompleted: ({ getTotalStudentByGender }) => {
      setTableData(getTotalStudentByGender || []);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  return { tableData, loading };
};

export default useGetTotalStudentByGender;
