import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ATTENDANCE_BY_CLASS_REPORT } from "../Schema/Student";

const useGetAttByClassAndDate = ({ classId, fromDate, toDate }) => {
  const [loading, setLoading] = useState(true);
  const [attData, setAttData] = useState({});

  // console.log("classId, fromDate, toDate::", classId, fromDate, toDate);

  const { refetch } = useQuery(GET_ATTENDANCE_BY_CLASS_REPORT, {
    variables: {
      classId: classId,
      fromDate,
      toDate,
    },
    onCompleted: ({ getStudendAttendanceReport }) => {
      setAttData(getStudendAttendanceReport || {});
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [classId, fromDate, toDate]);

  return { attData, loading, refetch };
};

export default useGetAttByClassAndDate;
