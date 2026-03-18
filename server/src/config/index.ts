

const appConfig = {
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || 'your_strong_jwt_secret',
    jwtExpiration: process.env.JWT_EXPIRATION || '30d',
    mongoURI: process.env.MONGO_URI,
    debug_mode: process.env.DEBUG_MODE === 'true',
}

const allowed = {
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: process.env.ALLOWED_METHODS || 'GET,POST,PUT,DELETE',
    allowedHeaders: process.env.ALLOWED_HEADERS || 'Content-Type,Authorization',
    credentials: true,
}

export const cloudinary = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
};

export const email = {
    creds: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    },
    from: {
        support: String(process.env.SUPPORT_EMAIL),
    },
};

const config = {
    ...appConfig,
    cloudinary,
    email,
    allowed
};

export default config;
