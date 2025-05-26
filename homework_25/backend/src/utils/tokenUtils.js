const jwt = require('jsonwebtoken');

let refreshTokens = [];

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
};

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    refreshTokens.push(refreshToken);
    return refreshToken;
};

const removeRefreshToken = (token) => {
    refreshTokens = refreshTokens.filter(t => t !== token);
};

const isRefreshTokenValid = (token) => {
    return refreshTokens.includes(token);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    removeRefreshToken,
    isRefreshTokenValid
};
