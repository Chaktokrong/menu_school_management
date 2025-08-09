import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ENROLLMENT_HOUR_BY_ENROLLMENT } from "../Schema/Class";

const useGetEnrollmentHour = ({ enrollmentId, status }) => {
  const [loading, setLoading] = useState(true);
  const [hourData, setHourData] = useState();

  const { refetch } = useQuery(GET_ENROLLMENT_HOUR_BY_ENROLLMENT, {
    variables: {
      // enrollmentId: "6877170b8592da0216fafa5d",
      // status: "Active",
      enrollmentId,
      status,
    },
    onCompleted: ({ getEnrollmentHourByEnrollment }) => {
      setHourData(getEnrollmentHourByEnrollment);
      setLoading(false);
    },
    onError: ({ message }) => {
      console.log("Error::", message);
    },
  });

  useEffect(() => {
    refetch();
  }, [enrollmentId, status]);

  return { hourData, loading, refetch };
};

export default useGetEnrollmentHour;
