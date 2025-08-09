import { gql } from "@apollo/client";

export const GET_HEADER_CARD_DATA = gql`
query GetHeaderCardData {
  getHeaderCardData {
    totalStudent
    totalTeacher
    totalClass
    totalOwe
    totalRevenue
  }
}
`

export const GET_ATTENDANCE_BY_TYPE = gql`
query GetAttendanceByType($fitlerType: String) {
  getAttendanceByType(fitlerType: $fitlerType) {
    name
    totalPresent
    totalLate
    totalPermission
    totalAbsent
  }
}
`

export const GET_TOTAL_STUDENT_BY_GENDER = gql`
query GetTotalStudentByGender {
  getTotalStudentByGender {
    totalStudent
    totalFemale
    totalMale
  }
}
`

export const GET_STUDENT_COMPLETE_CLASS = gql`
query GetStudentCompleteClass($page: Int, $limit: Int) {
  getStudentCompleteClass(page: $page, limit: $limit) {
    students {
      studentId {
        _id
        familyName
        studentName
        profile
        gender
      }
      classId {
        _id
        className
         courseId {
          _id
          enName
          khName
        }
      }
    }
    totalCount
  }
}
`

export const GET_TOTAL_REVENUE_BY_TYPE = gql`
query GetTotalRevenueByType {
  getTotalRevenueByType {
    totalByDirectClass
    totalByOnlineClass
    totalByBook
    totalByInstrument
  }
}
`