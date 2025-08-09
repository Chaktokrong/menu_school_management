import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLASS_PAGINATION } from "../Schema/Class";

const useGetClassPagination = ({ isComplete }) => {
  // 
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [paginationData, setPaginationData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { refetch } = useQuery(GET_CLASS_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
      isComplete: isComplete,
    },
    onCompleted: ({ getClassPagination }) => {
      // console.log("getClassPagination::", getClassPagination)
      setTableData(getClassPagination?.data);
      setPaginationData(getClassPagination?.paginator);
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
  }, [page, keyword, isComplete]);

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

export default useGetClassPagination;
