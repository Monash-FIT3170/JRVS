const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");

jest.setTimeout(30000);

// Connect to MongoDB
const uri = process.env.NODE_URI;

// Init mongo client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

describe("Database Tests", () => {
    let usersCollection;
  
    // Before testing connect to db
    beforeAll(async () => {
      try {
        await client.connect();
        const db = client.db("test");
        usersCollection = db.collection("users");
      } catch (err) {
        console.error("Error connecting to the database:", err);
      }
    });
  
    // test creating users
    test("Test CREATE", async () => {
      let newUsers = [];
      let total_users_to_add = 3;
  
      for (let i = 0; i < total_users_to_add; i++) {
        newUsers.push({
          name: faker.person.firstName(),
          email: faker.internet.email(),
        });
      }
  
      const result = await usersCollection.insertMany(newUsers);
      expect(result.insertedCount).toBe(total_users_to_add);
    }, 30000);
  
    afterEach(async () => {
      await usersCollection.deleteMany({});
    });
  
    afterAll(async () => {
      await client.close();
    });
  });