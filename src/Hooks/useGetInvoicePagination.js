import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_INVOICE_PAGEINATION } from "../Schema/Invoice";

const useGetInvoicePagination = (variables) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [paginationData, setPaginationData] = useState();

  const { refetch } = useQuery(GET_INVOICE_PAGEINATION, {
    variables: {
      ...variables,
      pagination: true,
      keyword: keyword,
      limit: limit,
      page: page,
    },
    onCompleted: ({ getInvoicePagination }) => {
      setLoading(false);
      setTableData(getInvoicePagination?.data);
      setPaginationData(getInvoicePagination?.paginator);
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
  }, [page, keyword, limit]);

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

export default useGetInvoicePagination;
