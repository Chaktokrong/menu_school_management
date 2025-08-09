import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_STUDENT_COMPLETE_CLASS } from "../Schema/Dashboard";

const useGetStudentCompleteClass = ({ page, limit }) => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // console.log("fitlerType::", fitlerType)

  const { refetch } = useQuery(GET_STUDENT_COMPLETE_CLASS, {
    variables: {
      page,
      limit
    },
    onCompleted: ({ getStudentCompleteClass }) => {
      setTableData(getStudentCompleteClass?.students || []);
      setTotalCount(getStudentCompleteClass?.totalCount)
      setLoading(false);
    },
    onError: (err) => {
      console.log("Error::", err?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [page, limit]);

  return { loading, tableData, totalCount };
};

export default useGetStudentCompleteClass;
