import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { GET_STUDENT_FOR_ATTENDANCE_LIST } from "../Schema/Student";

const useGetStudentForAttendanceList = ({ id, date = moment() }) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const { refetch } = useQuery(GET_STUDENT_FOR_ATTENDANCE_LIST, {
    variables: {
      classId: id,
      attendanceDate: moment(date).format("YYYY-MM-DD"),
    },
    onCompleted: ({ getStudentForAttendanceList }) => {
      setTableData(getStudentForAttendanceList);
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [id, date]);

  return { tableData, loading, refetch };
};

export default useGetStudentForAttendanceList;
