const typeDefs = `
    # Sub types
    type Item {
        itemId: Card
        stock: Int
    }

    type Prices {
        averageSellPrice: Float
        lowPrice: Float
        trendPrice: Float
    }

    type Cardmarket {
        url: String
        updatedAt: String
        prices: Prices
    }

    type Images {
        small: String
        large: String
    }

    # Regular types
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
        id: String
        name: String
        flavorText: String
        images: Images
        cardmarket: Cardmarket
    }
    
    type Inventory {
        _id: ID
        name: String
        cards: [Item]
    }

    type Query {
        # Profile queries
        profiles: [Profile]!
        profile(profileId: ID!): Profile

        getInventory(inventory: String): [Inventory]
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