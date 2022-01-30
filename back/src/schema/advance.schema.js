import { gql } from 'apollo-server';

const advanceType = gql`
    type Advance {
        _id: ID!
        project: Project!
        addDate: String
        description: String
        observations: String
    }
`;

const queries = gql`
    type Query {
        allAdvances: [Advance]
    }
`;

const mutations = gql`
    type Mutation {
        update_advance(_id: ID!, observations: String): Advance
    }
    type Mutation {
        registrarAdvance(nameProject: String! description: String!): Advance
    }
    type Mutation {
        update_advance_e(_id: ID!, description: String!): Advance
    }
`;

export default [
    advanceType,
    queries,
    mutations,
];