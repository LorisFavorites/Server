const typeDefs = `
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        profiles: [Profile]!
        profile(profileId: ID!): Profile
        # Context functionality uses JWT to decode data, so query will always return logged in user
        me: Profile
    }

    type Mutation {
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        removeProfile: Profile
    }
`;

module.exports = typeDefs;