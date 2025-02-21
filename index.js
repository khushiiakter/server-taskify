const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7xkdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("taskify").collection("users");
    const tasksCollection = client.db("taskify").collection("tasks");

    app.post("/users", async (req, res) => {
      const { _id, email, name, photo } = req.body;
      const existingUser = await usersCollection.findOne({ _id });

      if (!existingUser) {
        const result = await usersCollection.insertOne({
          _id,
          email,
          name,
          photo,
        });
        res.send(result);
      }
    });

    app.get("/tasks", async (req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

    app.post("/tasks", async (req, res) => {
      const newTask = req.body;

      const result = await tasksCollection.insertOne(newTask);
      res.send(result);
    });
    app.put("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const { _id, ...updatedTask} = req.body;
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedTask }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).send({
          success: false,
          message: "Task not found or no changes made.",
        });
      }
      res.send({ success: true, message: "Task updated successfully." });
    });

    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Taskify is running");
});

app.listen(port, () => {
  console.log(`Taskify is sitting on port ${port}`);
});
