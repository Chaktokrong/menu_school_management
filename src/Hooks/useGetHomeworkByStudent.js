import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOMEWORK_BY_STUDENT } from "../Schema/HomeWork";

const useGetHomeworkByStudent = ({ classId, subjectId, studentId }) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  
  // console.log("getHomeworkByStudent :", {
  //   date: null,
  //   classId: classId || "",
  //   studentId: studentId,
  //   subjectId: subjectId || "",
  // });

  const { refetch } = useQuery(GET_HOMEWORK_BY_STUDENT, {
    variables: {
      date: null,
      classId: classId || "",
      studentId: studentId,
      subjectId: subjectId || "",
    },
    onCompleted: ({ getHomeworkByStudent }) => {
      // console.log("getHomeworkByStudent :", getHomeworkByStudent);
      setLoading(false);
      setTableData(getHomeworkByStudent);
    },
    onError: ({ message }) => {
      setLoading(false);
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [classId, subjectId, studentId]);

  return { tableData, loading };
};

export default useGetHomeworkByStudent;
