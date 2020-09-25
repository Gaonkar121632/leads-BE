let config = {
  dev: {
    port: 3004,
    environment: "dev",
    mongodb: {
      uri: "mongodb://localhost:27017/leadDB",
      option: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    }
  },
  prod: {
    port: 3004,
    environment: "prod",
    mongodb: {
      uri: "mongodb+srv://admin:admin@cluster0.vo4hu.gcp.mongodb.net/LEAD-DB?retryWrites=true&w=majority",
      option: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    }
  }
};

module.exports = config[process.env.NODE_ENV || "dev"];