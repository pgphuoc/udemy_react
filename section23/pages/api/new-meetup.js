import { MongoClient } from "mongodb";

import { MONGO_URI, HTTP_STATUS_CREATED_SUCCESS } from "./../../constants";

// const client = new MongoClient(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(HTTP_STATUS_CREATED_SUCCESS).json({
      message: "Insert success!",
    });
  }
}

export default handler;
