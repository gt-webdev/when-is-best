module.exports = {
  port: process.env.PORT || 3000,
  mongo:{
    url: process.env.MONGOHQ_URL || "mongodb://localhost/whenisbest",
  },
  mandrill_api_key: process.env.MANDRILL_APIKEY || "Your APIKEY"
};
