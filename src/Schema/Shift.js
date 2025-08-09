import { gql } from "@apollo/client";

export const CREATE_SHIFT = gql`
  mutation CreateShift($input: ShiftInput) {
    createShift(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_SHIFT = gql`
  mutation UpdateShift($id: ID!, $input: ShiftInput) {
    updateShift(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_SHIFT = gql`
  mutation DeleteShift($id: ID!) {
    deleteShift(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const GET_SHIFT = gql`
  query GetShifts {
    getShifts {
      _id
      khName
      enName
      remark
    }
  }
`;
