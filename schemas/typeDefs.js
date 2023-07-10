const typeDefs = `
    type Profile {
        _id: ID
        name: String
        email: String
        favorites: [Card]
    }

    type Auth {
        token: ID!
        profile: Profile
    }

    type Card {
        _id: ID
        name: String
        imgUrl: String
        price: Int
        stock: Int
    }
    
    # Lowercase because it is a subdocument
    type item {
        itemId: ID
        stock: Int
    }

    type Inventory {
        _id: ID
        name: String
        cards: [item]
    }

    type Query {
        # Profile queries
        profiles: [Profile]!
        profile(profileId: ID!): Profile

        inventories: [Inventory]!
        cards: [Card]!

        # Context functionality uses JWT to decode data, so query will always return logged in user
        account: Profile
        favorites: [Card]
    }

    type Mutation {
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        removeProfile: Profile

        addFavorite(favorite: ID!): Profile
        removeFavorite(favorite: ID!): Profile
    }
`;

module.exports = typeDefs;