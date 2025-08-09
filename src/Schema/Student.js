import { gql } from "@apollo/client";

export const GET_NEXT_STUDENT_ID = gql`
  query Query {
    getNextStudentId
  }
`;

export const CREATE_STUDENT = gql`
  mutation CreateStudent($input: CreateStudentInput) {
    createStudent(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $input: CreateStudentInput) {
    updateStudent(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_STUDENT_FOR_ATTENDANCE_LIST = gql`
  query GetStudentForAttendanceList($classId: ID, $attendanceDate: String) {
    getStudentForAttendanceList(
      classId: $classId
      attendanceDate: $attendanceDate
    ) {
      studentData {
        attId
        _id
        profile
        studentId
        familyName
        studentName
        gender
        dob
        status
        reason
      }
      totalStudent
      totalFemale
      totalPresent
      totalPermission
      totalLate
      totalAbsent
    }
  }
`;

export const GET_ENROLL_MENT_BY_STUDENT = gql`
  query GetEnrollmentByStudent($studentId: ID, $status: String) {
    getEnrollmentByStudent(studentId: $studentId, status: $status) {
      _id
      classId {
        _id
        className
        courseId {
          _id
          enName
          khName
        }
        isComplete
        remark
        shiftId {
          khName
          enName
          _id
        }
        teacherId {
          _id
          address
          familyName
          userName
          role
          profile
        }
        totalHour
        totalLesson
      }
      studentId {
        _id
        familyName
        studentName
        studentId
      }
      startSchoolDate
      totalStudent
      totalHour
      totalRemainHour
      status
      remark
    }
  }
`;

export const GET_STUDENT_BY_id = gql`
  query GetStudentById($id: String) {
    getStudentById(_id: $id) {
      _id
      profile
      studentId
      familyName
      studentName
      gender
      dob
      phoneNumber
      email
      nationlity
      address
    }
  }
`;

export const GET_STUDENT_WITH_PAGINATION = gql`
  query GetStudentPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getStudentPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      data {
        _id
        profile
        studentId
        familyName
        studentName
        gender
        dob
        phoneNumber
        email
        nationlity
        address
      }
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
    }
  }
`;

export const GET_ATTENDANCE_BY_CLASS_REPORT = gql`
  query GetStudendAttendanceReport(
    $classId: ID
    $fromDate: String
    $toDate: String
  ) {
    getStudendAttendanceReport(
      classId: $classId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      studentData {
        studentId {
          _id
          profile
          studentId
          familyName
          studentName
          gender
          dob
        }
        attReports
        absent
        late
        permission
        present
      }
      attLenght
      totalAbsent
      totalFemale
      totalLate
      totalPermission
      totalPresent
      totalStudent
    }
  }
`;
