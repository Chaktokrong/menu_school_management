import { gql } from "@apollo/client";

export const CREATE_GROUP_FEE = gql`
  mutation CreateGroupFee($input: GroupFeeInput) {
    createGroupFee(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_GROUP_FEE = gql`
  mutation UpdateGroupFee($id: ID!, $input: GroupFeeInput) {
    updateGroupFee(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_GROUP_FEE = gql`
  mutation DeleteGroupFee($id: ID!) {
    deleteGroupFee(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_GROUP_FEE_PAGINATION = gql`
  query GetGroupFeePagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $type: String
  ) {
    getGroupFeePagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      type: $type
    ) {
      data {
        _id
        type
        title
        price
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
