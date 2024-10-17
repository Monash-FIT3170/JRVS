// Test updating users
test("Test UPDATE", async () => {
  // Create a sample user to update
  let sampleUser = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    sharableCode: faker.number.bigInt(),
  };

  // Insert the sample user
  const insertResult = await usersCollection.insertOne(sampleUser);
  expect(insertResult.insertedCount).toBe(1);

  // Update the user's email
  const updatedEmail = faker.internet.email();
  const updateResult = await usersCollection.updateOne(
    { username: sampleUser.username },
    { $set: { email: updatedEmail } },
  );

  // Verify the update was successful
  expect(updateResult.modifiedCount).toBe(1);

  // Retrieve the updated user and verify the email
  const updatedUser = await usersCollection.findOne({
    username: sampleUser.username,
  });
  expect(updatedUser.email).toBe(updatedEmail);
}, 30000);
