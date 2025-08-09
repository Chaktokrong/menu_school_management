import { gql } from "@apollo/client";

export const CREATE_SUBJECT = gql`
  mutation CreateSubject($input: SubjectInput) {
    createSubject(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubject($id: ID!, $input: SubjectInput) {
    updateSubject(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: ID!) {
    deleteSubject(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_SUBJECT_PAGINATION = gql`
  query GetSubjectPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getSubjectPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      data {
        _id
        khName
        enName
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
