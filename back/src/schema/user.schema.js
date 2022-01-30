import { gql } from 'apollo-server';

const userType = gql`
  # User
  type User {
    _id: ID!
    email: String!
    documentId: Float!
    name: String!
    lastName: String!
    fullName: String!
    role: Role!
    status: UserStatus!
    enrollments: [Enrollment]
  }
`;

const enums = gql`
  # Enum for role values
  enum UserRole {
    ADMIN
    LEADER
    STUDENT
  }

  # Enum for status values
  enum UserStatus {
    PENDING
    AUTHORIZED
    UNAUTHORIZED
  }
`;

const queries = gql`
  # Query all users
  type Query {
    allUsers: [User]
  }

  type Query {
    userById(_id: ID!): User
  }

  type Query {
    user: User!
  }

  type Query {
    userByEmail(email: String!): User
  }
  
  type Query {
    userByRole(role: UserRole!): [User]
  }
`;

const mutations = gql`
  type Mutation {
    register(input: RegisterInput!): User!
  }

  type Mutation {
    login(email: String!, password: String!): String!
  }
  type Mutation {
    updateUser(input: UpdateUserInput!): User!
  }
  type Mutation {
    changeStatusLider (documentId: Float!, status: UserStatus!): User!

  }
  type Mutation {
    changeStatus(email: String!, status: UserStatus!): User!
  }
`;



const inputs = gql`
  input RegisterInput {
    email: String!
    documentId: Float!
    name: String!
    lastName: String!
    role: UserRole!
    password: String!
  }

  input UpdateUserInput {
    email: String
    documentId: Float
    name: String
    lastName: String
    fullName: String
    role: UserRole
    password: String
  }
`;

export default [
  userType,
  enums,
  queries,
  mutations,
  inputs,
];
