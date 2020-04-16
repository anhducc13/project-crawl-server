module.exports = {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Ductt",
      description: "Crawl API",
      contact: {
        name: "Trần Tiến Đức",
        email: "trantienduc10@gmail.com"
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server"
      }
    ],
    security: [
      {
        ApiKeyAuth: []
      }
    ],
    tags: [],
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-Token"
        }
      }
    }
  };