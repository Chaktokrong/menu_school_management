import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ATTENDANCE_BY_TYPE } from "../Schema/Dashboard";

const useGetAttendanceByType = ({ fitlerType }) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  // console.log("fitlerType::", fitlerType)

  const { refetch } = useQuery(GET_ATTENDANCE_BY_TYPE, {
    variables: {
      fitlerType
    },
    onCompleted: ({ getAttendanceByType }) => {
      setTableData(getAttendanceByType || []);
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [fitlerType]);

  return { tableData, loading, };
};

export default useGetAttendanceByType;
