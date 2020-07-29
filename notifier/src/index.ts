import express from "express";

import dbProvider from "./db_provider";
import pushProvider from "./push_provider";
import { RequestType } from "./types";

async function main() {
  const app = express();
  app.use(express.json());

  app.get("/ping", (req, res) => {
    res.send("Ok");
  });

  app.post("/notify", async (req, res) => {
    const data: RequestType = req.body;
    if (!data.to) {
      return res.status(400).send("Missing recipient");
    }
    if (!data.from) {
      return res.status(400).send("Missing sender");
    }
    console.log(`Sending push notification to ${data.to}`);
    const deviceToken = await dbProvider.getDeviceToken(data.to);
    try {
      await pushProvider.send(
        deviceToken!,
        `New message from ${data.from.split("@")[0]}`,
        data.body,
        {
          sender: data.to,
        }
      );
      res.send("Ok");
    } catch (ex) {
      res.status(500).send(ex);
    }
  });

  app.listen(8999, () => {
    console.log("Listening on port 8999...");
  });
}

main();
