import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SHIFT } from "../Schema/Shift";

const useGetShift = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { refetch } = useQuery(GET_SHIFT, {
    onCompleted: ({ getShifts }) => {
      setTableData(getShifts || []);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  return { tableData, loading, refetch };
};

export default useGetShift;
