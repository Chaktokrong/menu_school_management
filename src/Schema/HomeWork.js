import { gql } from "@apollo/client";

export const GET_HOMEWORK_BY_STUDENT = gql`
  query GetHomeworkByStudent(
    $studentId: ID
    $classId: ID
    $subjectId: ID
    $date: String
  ) {
    getHomeworkByStudent(
      studentId: $studentId
      classId: $classId
      subjectId: $subjectId
      date: $date
    ) {
      studentHomework {
        _id
        checkDate
        exercise
        remark
        status
        subjectId {
          _id
          khName
          enName
          remark
        }
      }
      totalComplete
      totalIncomeplete
      totalLate
      totalMissing
    }
  }
`;

export const GET_HOMEWORK_BY_CLASS = gql`
  query GetGenerateHomeworkPagination(
    $page: Int
    $limit: Int
    $classId: ID
    $subjectId: ID
    $date: String
  ) {
    getGenerateHomeworkPagination(
      page: $page
      limit: $limit
      classId: $classId
      subjectId: $subjectId
      date: $date
    ) {
      data {
        _id
        classId {
          className
        }
        checkDate
        subjectId {
          _id
          enName
          khName
        }
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

export const GET_STUDENT_HOMEWORK_FOR_CHECK_LIST = gql`
  query GetStudentHomeworkForCheckList(
    $date: String
    $classId: ID
    $subjectId: ID
    $studentId: ID
  ) {
    getStudentHomeworkForCheckList(
      date: $date
      classId: $classId
      subjectId: $subjectId
      studentId: $studentId
    ) {
      _id
      subjectId {
        _id
        khName
        enName
        remark
      }
      studentId {
        _id
        profile
        studentName
        familyName
      }
      exercise
      status
      remark
      checkDate
    }
  }
`;

export const CHECK_STUDENT_HOMEWROK = gql`
  mutation CheckStudentHomework(
    $id: ID
    $status: HomeworkStatus
    $exercise: String
    $remark: String
  ) {
    checkStudentHomework(
      _id: $id
      status: $status
      exercise: $exercise
      remark: $remark
    ) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const CREATE_STUDENT_HOMEWORK = gql`
  mutation CreateStudentHomework($input: InputStudentHomework) {
    createStudentHomework(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_STUDENT_HOMEWORK = gql`
  mutation DeleteStudentHomework($id: ID) {
    deleteStudentHomework(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GENERATE_STUDENT_HOMEWORK = gql`
  mutation GenerateStudentHomeWork(
    $classId: ID!
    $subjectId: ID!
    $date: String!
  ) {
    generateStudentHomeWork(
      classId: $classId
      subjectId: $subjectId
      date: $date
    ) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;
