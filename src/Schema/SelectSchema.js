import { gql } from "@apollo/client";

export const SELECT_COURSE = gql`
  query SelectCourse {
    selectCourse {
      _id
      khName
      enName
    }
  }
`;

export const SELECT_USER = gql`
  query SelectUser($role: UserRole) {
    selectUser(role: $role) {
      _id
      familyName
      userName
    }
  }
`;

export const SELECT_SUBJECT = gql`
  query SelectSubject {
    selectSubject {
      _id
      khName
      enName
      remark
    }
  }
`;

export const SELECT_SUBJECT_BY_CLASS_ID = gql`
  query SelectSubjectByClassId($classId: ID!) {
    selectSubjectByClassId(classId: $classId) {
      _id
      khName
      enName
      remark
    }
  }
`;

export const SELECT_CLASS = gql`
  query SelectClass {
    selectClass {
      _id
      className
      courseId {
        khName
        enName
        _id
      }
    }
  }
`;

export const SELECT_CLASS_BY_STUDENT_ID = gql`
  query GetClassByStudentId($studentId: ID) {
    getClassByStudentId(studentId: $studentId) {
      _id
      className
      courseId {
        enName
        khName
        _id
      }
    }
  }
`;

export const SELECT_EXAM_TYPE = gql`
  query SelectExamType($classId: ID) {
    selectExamType(classId: $classId) {
      _id
      examName
    }
  }
`;

export const SELECT_GROUP_FEE = gql`
  query SelectGroupFee {
    selectGroupFee {
      _id
      type
      title
      price
      remark
    }
  }
`;
export const SELECT_STUDENT = gql`
  query SelectStudent {
    selectStudent {
      _id
      profile
      familyName
      studentName
    }
  }
`;

export const SELECT_ENROLLMENT_BY_STUDENT = gql`
  query SelectEnrollmentByStudent($studentId: ID) {
    selectEnrollmentByStudent(studentId: $studentId) {
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
        studentName
        familyName
        profile
      }
    }
  }
`;
