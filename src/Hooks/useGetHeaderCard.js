import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_HEADER_CARD_DATA } from "../Schema/Dashboard";

const useGetHeaderCard = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { refetch } = useQuery(GET_HEADER_CARD_DATA, {
    onCompleted: ({ getHeaderCardData }) => {
      setTableData(getHeaderCardData || []);
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

export default useGetHeaderCard;
