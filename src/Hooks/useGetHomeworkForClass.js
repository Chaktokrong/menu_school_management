import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOMEWORK_BY_CLASS } from "../Schema/HomeWork";
import moment from "moment";

const useGetHomeworkForClass = ({ classId, subjectId, date }) => {
  // 
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  // 
  const { refetch } = useQuery(GET_HOMEWORK_BY_CLASS, {
    variables: {
      page: 1,
      limit: 20, 
      classId: classId,
      subjectId: subjectId || "", 
      date: date ? moment(date).format("YYYY-MM-DD") : null, 
    },
    onCompleted: ({ getGenerateHomeworkPagination }) => {
      console.log("getGenerateHomeworkPagination :" , getGenerateHomeworkPagination) 
      if(getGenerateHomeworkPagination?.data) {
        setLoading(false);
        setTableData(getGenerateHomeworkPagination?.data);
      } 
    },
    onError: ({ message }) => {
      setLoading(false);
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [classId, date, subjectId]);

  return { tableData, loading, refetch };
};

export default useGetHomeworkForClass;
