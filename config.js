module.exports = {
  port: process.env.port || 3000,
  mongo:{
    //url: process.env.MONGOHQ_URL || "mongodb://localhost/whenisbest"
    url: 'mongodb://test:123@linus.mongohq.com:10090/app30734144' || "mongodb://localhost/whenisbest"
  },
  mandrill_api_key: process.env.MANDRILL_APIKEY || "Your APIKEY"
};
