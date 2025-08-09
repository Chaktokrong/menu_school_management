import { gql } from "@apollo/client";

export const GET_INVOICE_PAGEINATION = gql`
  query GetInvoicePagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $enrollmentId: ID
    $studentId: ID
    $startDate: String
    $endDate: String
    $paymentStatus: String
  ) {
    getInvoicePagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      enrollmentId: $enrollmentId
      studentId: $studentId
      startDate: $startDate
      endDate: $endDate
      paymentStatus: $paymentStatus
    ) {
      data {
        _id
        invoiceNumber
        invoiceType
        void
        studentId {
          _id
          studentId
          familyName
          profile
          studentName
          dob
          gender
          phoneNumber
        }
        totalAmount
        remark
        items {
          groupFeeId {
            _id
            type
            title
            price
            remark
          }
          startDate
          endDate
          price
          qty
          discountType
          discount
          amount
        }
        date
        createdAt
        enrollmentId {
          _id
          classId {
            className
            courseId {
              khName
              enName
            }
          }
        }
        paymentStatus
        totalOwe
        paymentHistory {
          _id
          paidAmount
          remark
          void
          createdAt
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

export const GET_INVOICE_BY_STUDENT_PAGEINATION = gql`
  query GetInvoiceByStudentPagination(
    $page: Int
    $limit: Int
    $studentId: ID
    $startDate: String
    $endDate: String
    $paymentStatus: String
    $keyword: String
  ) {
    getInvoiceByStudentPagination(
      page: $page
      limit: $limit
      studentId: $studentId
      startDate: $startDate
      endDate: $endDate
      paymentStatus: $paymentStatus
      keyword: $keyword
    ) {
      data {
        _id
        invoiceNumber
        invoiceType
        totalAmount
        totalOwe
        void
        remark
        paymentStatus
        items {
          groupFeeId {
            _id
            type
            title
            price
            remark
          }
          startDate
          endDate
          price
          qty
          discountType
          discount
          amount
        }
        date
        createdAt
        enrollmentId {
          _id
          classId {
            className
            courseId {
              khName
              enName
            }
          }
        }
        studentId {
          _id
          studentId
          familyName
          profile
          studentName
          dob
          gender
          phoneNumber
        }
        paymentHistory {
          _id
          paidAmount
          void
          remark
          createdAt
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

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: InvoiceInput) {
    createInvoice(input: $input) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const UPDATE_INVOICE = gql`
  mutation UpdateInvoice($id: ID!, $input: InvoiceInput) {
    updateInvoice(_id: $id, input: $input) {
      message {
        messageKh
        messageEn
      }
      isSuccess
    }
  }
`;

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($invoiceId: ID, $paidAmount: Float, $remark: String) {
    createPayment(
      invoiceId: $invoiceId
      paidAmount: $paidAmount
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

export const GET_NEXT_INVOICE_ID = gql`
  query Query {
    getNextInvoiceId
  }
`;

export const VOID_INVOICE = gql`
  mutation VoidInvoice($id: ID!) {
    voidInvoice(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;

export const VOID_PAYMENT = gql`
  mutation VoidPayment($id: ID!) {
    voidPayment(_id: $id) {
      isSuccess
      message {
        messageKh
        messageEn
      }
    }
  }
`;
