import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput) {
    createUser(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_TEACHER_BY_id = gql`
  query GetTeacherById($id: ID) {
    getTeacherById(_id: $id) {
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
  }
`;

export const GET_USER_WITH_PAGINATION = gql`
  query GetUserPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $role: UserRole
  ) {
    getUserPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      role: $role
    ) {
      data {
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

export const GET_USER_LOGIN = gql`
  query GetUserLogin {
    getUserLogin {
      isSuccess
      user {
        _id
        profile
        userName
        email
        role
      }
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateAccountingUserRole(
    $id: ID!
    $role: AccountingUserRoleMutation!
  ) {
    updateAccountingUserRole(_id: $id, role: $role) {
      status
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput) {
    updateUser(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation ChangeUserPassword($id: ID!, $newPassword: String) {
    changeUserPassword(_id: $id, newPassword: $newPassword) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      isSuccess
      message {
        messageKh
        messageEn
      }
      token
      user {
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
    }
  }
`;
