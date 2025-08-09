import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENT_BY_CLASS_ID } from "../Schema/Class";

const useGetStudentByclassId = ({ id, isComplete }) => {
  // 
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [keyword, setKeyword] = useState("");

  // 
  const { refetch } = useQuery(GET_STUDENT_BY_CLASS_ID, {
    variables: { 
      keyword: keyword,
      classId: id,
      isComplete,
    },
    onCompleted: ({ getStudentByclassId }) => {
      setTableData(getStudentByclassId || []);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(() => {
    refetch();
  }, [isComplete, keyword, id]);

  return { tableData, loading, refetch, handleSearch };
};

export default useGetStudentByclassId;
