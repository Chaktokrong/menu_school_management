import { gql } from "@apollo/client";

export const GET_TEACHING_TIME_BY_STUDENT = gql`
  query GetTeachingTimeByStudent(
    $studentId: ID!
    $classId: ID
    $subjectId: ID
    $fromDate: String
    $toDate: String
    $keyword: String
  ) {
    getTeachingTimeByStudent(
      studentId: $studentId
      classId: $classId
      subjectId: $subjectId
      fromDate: $fromDate
      toDate: $toDate
      keyword: $keyword
    ) { 
      date
      startTime
      endTime
      lesson
      remark
      subjectId {
        khName
        enName
      }
    }
  }
`;
export const GET_TEACHING_TIME_PAGINATION = gql`
  query GetTeachingTimesPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $classId: String
    $subjectId: String
    $fromDate: String
    $toDate: String
  ) {
    getTeachingTimesPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      classId: $classId
      subjectId: $subjectId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      data {
        _id
        classId {
          _id
          className
          teacherId {
            _id
            familyName
            userName
          }
        }
        date
        startTime
        endTime
        lesson
        remark
        studentIds {
          _id
          familyName
          profile
          studentName
        }
        subjectId {
          khName
          enName
          _id
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

export const CREATE_TEACHING_TIME = gql`
  mutation CreateTeachingTime($input: TeachingTimeInput) {
    createTeachingTime(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_TEACHING_TIME = gql`
  mutation UpdateTeachingTime($id: ID!, $input: TeachingTimeInput) {
    updateTeachingTime(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_TEACHING_TIME = gql`
  mutation DeleteTeachingTime($id: ID!) {
    deleteTeachingTime(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;
