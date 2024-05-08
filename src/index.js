import {
  start as connectToMongoDB,
  closeMongoDBConnection,
} from "./mongodb.js";
import { getServices } from "./services/controller.js";
import { server } from "./server.js";

class App {
  constructor() {
    this.init();
  }

  async init() {
    // Start the server and listen on port 3000
    server.listen(3000, async () => {
      console.log("Server is running on port 3000");
      await connectToMongoDB();
      const services = await getServices();
      console.log(services);
    });
  }

  handleAppTermination() {
    process.on("SIGINT", async () => {
      console.log("Received SIGINT signal. Closing MongoDB connection...");
      await closeMongoDBConnection();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("Received SIGTERM signal. Closing MongoDB connection...");
      await closeMongoDBConnection();
      process.exit(0);
    });
  }
}

new App();
