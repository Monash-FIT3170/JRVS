const { MongoClient } = require("mongodb");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv").config();
const request = require("supertest");
// const app = require("../server")

jest.setTimeout(30000);

// Connect to MongoDB
// Init mongo client
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
      });
    }

    const result = await usersCollection.insertMany(newUsers);
    expect(result.insertedCount).toBe(total_users_to_add);
  }, 30000);

  // test reading users
  test("Test READ", async () => {
    let sampleUser = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
    };

    await usersCollection.insertOne(sampleUser);

    const findUser = await usersCollection.findOne({
      username: sampleUser.username,
    });

    expect(findUser.username).toBe(sampleUser.username);
  }, 30000);

  // After each test remove all test users
  afterEach(async () => {
    await usersCollection.deleteMany({});
  });

  // after all close the client
  afterAll(async () => {
    await client.close();
  });
});

// describe("API Tests", () =>{

//   beforeAll(async () => {
//     try {
//       await client.connect();
//       const db = client.db("test");
//       usersCollection = db.collection("users");
//     } catch (err) {
//       console.error("Error connecting to the database:", err);
//     }
//   });

//   it("tests /users endpoint - positive test", async () => {
//     const response = await request(app).get("users");
//     expect(response.body).toHaveLength(3);
//     expect(response.statusCode).toBe(200);
// });

// it("test adding user", (done) => {
//     let user = {username: faker.internet.userName(), firstname: faker.person.firstName() , lastname: faker.person.lastName(), email: faker.internet.email(), school: "monash", password: faker.internet.password()};
//     const response = request(app)
//     .post('/users')
//     .send()
//     .set('Accept', 'application/json')
//     .expect(200)
//     .expect((res) => {
//       res.body.username = user.username;
//     })
//     .end((err, res) => {
//       if (err) return done(err);
//         return done();
//     })
// })

//   afterAll(async () => {
//     await client.close();
//   });
// })
