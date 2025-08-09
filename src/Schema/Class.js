import { gql } from "@apollo/client";

export const CREATE_CLASS = gql`
  mutation CreateClass($input: ClassInput) {
    createClass(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_CLASS = gql`
  mutation UpdateClass($id: ID!, $input: ClassInput) {
    updateClass(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_CLASS = gql`
  mutation DeleteClass($id: ID!) {
    deleteClass(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_COMPLETE_CLASS = gql`
  mutation UpdateCompleteClass($id: ID!) {
    updateCompleteClass(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_STUDENT_ENROLLMENT = gql`
  mutation DeleteStudentEnrollment($id: ID!) {
    deleteStudentEnrollment(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_STUDENT_ENROLLMENT = gql`
  mutation UpdateStudentEnrollment($id: ID!, $input: EnrollmentInput) {
    updateStudentEnrollment(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const CREATE_ENROLLMENT_HOUR = gql`
  mutation CreateEnrollmentHour($input: EnrollmentHourInput) {
    createEnrollmentHour(input: $input) {
      isSuccess
      message {
        messageEn
        messageKh
      }
    }
  }
`;

export const UPDATE_ENROLLMENT_HOUR = gql`
  mutation UpdateEnrollmentHour($input: EnrollmentHourUpdateInput) {
    updateEnrollmentHour(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_STUDENT_ENROLLMENT_STATUS = gql`
  mutation UpdateStudentEnrollmentStatus($id: ID!, $status: EnrollStatus) {
    updateStudentEnrollmentStatus(_id: $id, status: $status) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const CREATE_STUDENT_ENROLLMENT = gql`
  mutation CreateStudentEnrollment($input: EnrollmentInput) {
    createStudentEnrollment(input: $input) {
      message {
        messageEn
        messageKh
      }
      isSuccess
    }
  }
`;

export const GET_STUDENT_BY_CLASS_ID = gql`
  query GetStudentByclassId(
    $keyword: String
    $classId: String
    $isComplete: String
  ) {
    getStudentByclassId(
      keyword: $keyword
      classId: $classId
      isComplete: $isComplete
    ) {
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
      enrollmentId {
        _id
        status
      }
      startHourDate
      totalHour
      totalHourRemain
    }
  }
`;

export const CHECK_STUDENT_ATTENDANCE = gql`
  mutation CheckStudentAttendance(
    $reason: String
    $date: String
    $status: AttStatus
    $studentId: String
    $classId: String
  ) {
    checkStudentAttendance(
      reason: $reason
      date: $date
      status: $status
      studentId: $studentId
      classId: $classId
    ) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_SCHEDULE_BY_CLASS = gql`
  query GetScheduleByClass($classId: ID!) {
    getScheduleByClass(classId: $classId) {
      day
      scheduleData {
        _id
        type
        subjectId {
          _id
          khName
          enName
          remark
        }
        startTime
        endTime
        remark
      }
    }
  }
`;

export const GET_CLASS_BY_ID = gql`
  query GetClassById($id: ID) {
    getClassById(_id: $id) {
      _id
      courseId {
        khName
        enName
        _id
      }
      className
      totalLesson
      totalHour
      totalStudent
      isComplete
      remark
      teacherId {
        _id
        profile
        teacherId
        familyName
        userName
        gender
        dob
        phoneNumber
        nationlity
        address
        email
        role
      }
      shiftId {
        _id
        khName
        enName
        remark
      }
      duration
    }
  }
`;

export const GET_CLASS_BY_TEACHER_ID = gql`
  query GetClassByTeacherId($teacherId: ID) {
    getClassByTeacherId(teacherId: $teacherId) {
      _id
      courseId {
        khName
        enName
        _id
      }
      className
      teacherId {
        _id
        profile
        role
        familyName
        teacherId
        address
        userName
        phoneNumber
        nationlity
        gender
        email
        dob
      }
      shiftId {
        khName
        enName
        _id
      }
      totalLesson
      totalHour
      totalStudent
      isComplete
      remark
    }
  }
`;

export const GET_CLASS_PAGINATION = gql`
  query GetClassPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $isComplete: Boolean
  ) {
    getClassPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      isComplete: $isComplete
    ) {
      data {
        _id
        duration
        courseId {
          khName
          enName
          _id
        }
        className
        teacherId {
          _id
          familyName
          userName
          profile
          role
        }
        shiftId {
          _id
          enName
          khName
        }
        totalLesson
        totalHour
        remark
        totalStudent
        isComplete
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

export const GET_ENROLLMENT_BY_CLASS_AND_STUDENT = gql`
  query GetEnrollmentByClassAndStudent($classId: ID, $studentId: ID) {
    getEnrollmentByClassAndStudent(classId: $classId, studentId: $studentId) {
      _id
      classId {
        _id
        className
        courseId {
          khName
          enName
          _id
        }
      }
      studentId {
        _id
        familyName
        profile
        studentName
        studentId
      }
      startSchoolDate
      totalHour
      status
      totalStudent
      remark
    }
  }
`;

export const GET_ENROLLMENT_HOUR_BY_ENROLLMENT = gql`
  query GetEnrollmentHourByEnrollment(
    $enrollmentId: ID!
    $status: EnrollmentHourStatus!
  ) {
    getEnrollmentHourByEnrollment(
      enrollmentId: $enrollmentId
      status: $status
    ) {
      _id
      startHourDate
      totalHour
      remark
    }
  }
`;
