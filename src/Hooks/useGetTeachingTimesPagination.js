import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TEACHING_TIME_PAGINATION } from "../Schema/TeachingTime";

const useGetTeachingTimesPagination = ({
  toDate,
  classId,
  fromDate,
  subjectId,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [paginationData, setPaginationData] = useState();

  const { refetch } = useQuery(GET_TEACHING_TIME_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
 
      toDate: toDate,
      classId: classId,
      fromDate: fromDate,
      subjectId: subjectId,
    },
    onCompleted: ({ getTeachingTimesPagination }) => {
      // console.log("getTeachingTimesPagination::::", getTeachingTimesPagination);
      // 
      setTableData(getTeachingTimesPagination?.data);
      setPaginationData(getTeachingTimesPagination?.paginator);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  const handleSearch = (e) => {
    setPage(1);
    setKeyword(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [page, keyword]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  return {
    page,
    limit,
    setPage,
    refetch,
    loading,
    tableData,
    setLoading,
    handleLimit,
    handleSearch,
    paginationData,
  };
};

export default useGetTeachingTimesPagination;
