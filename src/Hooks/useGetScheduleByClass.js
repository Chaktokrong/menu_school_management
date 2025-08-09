import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULE_BY_CLASS } from "../Schema/Class";

const useGetScheduleByClass = ({ classId }) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const { refetch } = useQuery(GET_SCHEDULE_BY_CLASS, {
    variables: {
      classId: classId,
    },
    onCompleted: ({ getScheduleByClass }) => {
      setTableData(getScheduleByClass || []);
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [classId]);

  return { tableData, loading, refetch };
};

export default useGetScheduleByClass;
