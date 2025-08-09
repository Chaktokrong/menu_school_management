import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CourseInput) {
    createCourse(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $input: CourseInput) {
    updateCourse(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  } 
`;

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      } 
    }
  }
`;

export const GET_COURSE_PAGINATION = gql`
  query GetCoursePagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getCoursePagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      data {
        _id
        khName
        enName
        totalHour
        remark
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
