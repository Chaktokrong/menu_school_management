import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEACHING_TIME_BY_STUDENT } from "../Schema/TeachingTime";

const useGetTeachingTimeByStudent = ({
  toDate,
  classId,
  fromDate,
  subjectId,
  studentId,
}) => {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  // console.log("varable",  {
  //     toDate: toDate,
  //     keyword: keyword,
  //     classId: classId,
  //     fromDate: fromDate,
  //     subjectId: subjectId,
  //     studentId: studentId,
  //   },)

  //
  const { refetch } = useQuery(GET_TEACHING_TIME_BY_STUDENT, {
    variables: {
      // fromDate: fromDate,
      // toDate: toDate,
      fromDate: "",
      toDate: "",
      keyword: keyword,
      classId: classId,
      subjectId: subjectId,
      studentId: studentId,
    },
    onCompleted: ({ getTeachingTimeByStudent }) => {
      setTableData(getTeachingTimeByStudent);
      setLoading(false);
    },
    onError: (err) => {
      console.log("getTeachingTimeByStudent Error::", err?.message);
    },
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [toDate, keyword, classId, fromDate, subjectId, studentId]);

  return {
    loading,
    tableData,
    handleSearch,
  };
};

export default useGetTeachingTimeByStudent;
