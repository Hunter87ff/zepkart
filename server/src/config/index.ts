const appConfig = {
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET,
    mongoURI: process.env.MONGO_URI
}

export default appConfig;