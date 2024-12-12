import swaggerAutogen from "swagger-autogen";

const generateSwagger = swaggerAutogen();

const swaggerDocument = {
  info: {
    version: "1.0.0",
    title: "Payment Gateway APIs",
    description: "API for managing payment transactions",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    { name: "Payments", description: "Payment operations" },
    { name: "Transactions", description: "Transaction management" },
  ],
  definitions: {
    PaymentRequest: {
      amount: 100.0,
      currency: "USD",
      method: "card",
    },
    PaymentResponse: {
      transactionId: "txn_12345",
      status: "success",
    },
  },
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./app.js"];

generateSwagger(outputFile, endpointsFiles, swaggerDocument);
