const controllers = require("./api");
const express = require('express');
const router = express.Router();

async function startServer() {
  const app = express();
  const port = 3000;

  await require("./loaders")(app);

  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    console.log(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️ 
        ################################################
      `);
  });
}

startServer();



