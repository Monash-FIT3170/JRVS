// Test inserting invalid user data
test("Test CREATE with invalid data", async () => {
  // Create a user with missing required fields (e.g., no username)
  let invalidUser = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    // Missing 'username' field
    sharableCode: faker.number.bigInt(),
  };

  // Try inserting invalid user and catch error
  try {
    await usersCollection.insertOne(invalidUser);
  } catch (err) {
    // Ensure the error is thrown
    expect(err).toBeDefined();
    // Optionally, check if the error message matches
    expect(err.message).toContain("document must have a username");
  }

  // Verify that no invalid user was inserted
  const foundUser = await usersCollection.findOne({ email: invalidUser.email });
  expect(foundUser).toBeNull();
}, 30000);
