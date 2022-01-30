import { gql } from 'apollo-server';

const enrollmentType = gql`
  # Enrollment
  type Enrollment {
    _id: ID!
    status: EnrollmentStatus
    enrollmentDate: String
    egresDate: String
    project: Project!
    student: User!
  }
`;

const enums = gql`
  # Enum for status values
  enum EnrollmentStatus {
    ACEPTED
    REJECTED
  }
`;

const queries = gql`
  # Query all enrollments
  type Query {
    allEnrollments: [Enrollment]
  }
  type Query {
    allEnrollmentsE: [Enrollment]
  }
`;

const mutations = gql`
  type Mutation {
    registerEnrrolment020(input: enrrolmentInput!): Enrollment!
  }

  type Mutation {
    update_enrollment(_id: ID!, status: EnrollmentStatus!): Enrollment
  }

`;


const inputs = gql`
  input enrrolmentInput {
    project: String!
  }
`;

export default [
  enrollmentType,
  enums,
  queries,
  mutations,
  inputs,
];
