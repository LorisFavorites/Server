const jwt = require('jsonwebtoken');

/** 
 *  ! Should secret be an env variable??
 */ 
const secret = 'supersecretexampleshhhh';
const expiration = '4h';

module.exports = {
    authMiddleware: function ({ req }) {
        // Set up token so that it can sent in req.body, req.query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // If token was in the header split the token string to parse it out of the header.
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        // Attempt to verify token, add decoded user data to the request so it can be accessed in the resolver
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Request denied, invalid token');
        }

        // Return the request object, so it can be passed to the resolver as 'context.
        return req;
    },
    signToken: function ({ email, name, _id }) {
        const payload = { email, name, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
}