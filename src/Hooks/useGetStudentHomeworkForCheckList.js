import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENT_HOMEWORK_FOR_CHECK_LIST } from "../Schema/HomeWork";

const useGetStudentHomeworkForCheckList = (variables) => {
  const [tableData, setTableData] = useState([]);
  // console.log("variables :", variables);
  const { loading, refetch } = useQuery(GET_STUDENT_HOMEWORK_FOR_CHECK_LIST, {
    variables,
    onCompleted: ({ getStudentHomeworkForCheckList }) => {
      // console.log(
      //   "getStudentHomeworkForCheckList :",
      //   getStudentHomeworkForCheckList
      // );
      setTableData(getStudentHomeworkForCheckList || []);
    },
    onError: (error) => {
      console.error("Error::", error.message);
      setTableData([]);
    },
  });

  useEffect(() => {
    refetch();
    setTableData([]);
  }, [
    variables?.date,
    variables?.classId,
    variables?.subjectId,
    variables?.studentId,
  ]);

  return { tableData, loading, refetch };
};

export default useGetStudentHomeworkForCheckList;
