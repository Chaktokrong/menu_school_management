import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENT_FOR_EXAM_TABLE } from "../Schema/ExamType";

const useGetStudentForExamTable = (variables) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { refetch } = useQuery(GET_STUDENT_FOR_EXAM_TABLE, { 
    variables: variables,
    onCompleted: ({ getStudentForExamTable }) => {
      setTableData(getStudentForExamTable || []);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [variables]);

  return { tableData, loading, refetch };
};

export default useGetStudentForExamTable;
