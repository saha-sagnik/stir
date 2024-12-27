
require('dotenv').config();



if (!process.env.TWITTER_USERNAME || !process.env.TWITTER_PASSWORD) {
    console.error('Environment variables TWITTER_USERNAME or TWITTER_PASSWORD are missing!');
    process.exit(1); // Exit with an error code
}

if (!process.env.DB_URL) {
    console.error('Environment variable DB_URL is missing!');
    process.exit(1); // Exit with error code
}

module.exports = {
    mongodbUrl: process.env.DB_URL, // Use DB_URL here
    proxyUrl: process.env.PROXY_URL,
    twitterUsername: process.env.TWITTER_USERNAME,
    twitterPassword: process.env.TWITTER_PASSWORD,
};

