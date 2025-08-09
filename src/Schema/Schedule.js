import { gql } from "@apollo/client";

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule($id: ID!, $input: ScheduleInputUpdate) {
    updateSchedule(_id: $id, input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($input: ScheduleInput) {
    createSchedule(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation DeleteSchedule($id: ID!) {
    deleteSchedule(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;
