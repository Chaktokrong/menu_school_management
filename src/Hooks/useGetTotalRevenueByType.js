import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOTAL_REVENUE_BY_TYPE } from "../Schema/Dashboard";

const useGetTotalRevenueByType = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { refetch } = useQuery(GET_TOTAL_REVENUE_BY_TYPE, {
    onCompleted: ({ getTotalRevenueByType }) => {
      setTableData(getTotalRevenueByType);
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

export default useGetTotalRevenueByType;
