import { gql } from "@apollo/client";

export const CREATE_EXAM_TYPE = gql`
  mutation CreateExamType($input: ExamTypeInput) {
    createExamType(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_EXAM_TYPE = gql`
  mutation UpdateExamType($id: ID!, $input: ExamTypeInput) {
    updateExamType(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_EXAM_TYPE = gql`
  mutation DeleteExamType($id: ID!) {
    deleteExamType(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_STUDENT_EXAM_SCORE = gql`
  mutation UpdateStudentExamScore(
    $score: Float
    $subjectId: String
    $studentId: ID
    $examTypeId: ID
  ) {
    updateStudentExamScore(
      score: $score
      subjectId: $subjectId
      studentId: $studentId
      examTypeId: $examTypeId
    ) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_STUDENT_FOR_EXAM_TABLE = gql`
  query GetStudentForExamTable(
    $classId: ID
    $examTypeId: ID
    $keyword: String
  ) {
    getStudentForExamTable(
      classId: $classId
      examTypeId: $examTypeId
      keyword: $keyword
    ) {
      _id
      studentId {
        _id
        profile
        gender
        familyName
        studentName
      }
      examTypeId {
        _id
        examName
      }
      totalScore
      average
      subjectScoreData {
        _id
        score
        exercise
        subjectId {
          _id
          enName
          khName
          remark
        }
      }
    }
  }
`;

export const GET_EXAM_TYPE = gql`
  query GetExamTypePagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getExamTypePagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      data {
        _id
        examName
        classId {
          _id
          className
          courseId {
            khName
            enName
            _id
          }
        }
        scoreIndex
        subjectScore {
          maxScore
          score
          subjectId {
            _id
            enName
            khName
          }
        }
        remark
        examDate
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

export const CREATE_EXAM = gql`
  mutation CreateExam($input: ExamInput) {
    createExam(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_EXAM = gql`
  mutation UpdateExam($id: ID!, $arrayId: ID!, $input: ExamInput) {
    updateExam(_id: $id, arrayId: $arrayId, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_EXAM = gql`
  mutation DeleteExam($id: ID!, $arrayId: ID!) {
    deleteExam(_id: $id, arrayId: $arrayId) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;
