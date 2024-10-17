// Test deleting users
test("Test DELETE", async () => {
  // Create a sample user to delete
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

  // Delete the user
  const deleteResult = await usersCollection.deleteOne({
    username: sampleUser.username,
  });

  // Verify the deletion was successful
  expect(deleteResult.deletedCount).toBe(1);

  // Attempt to find the deleted user
  const deletedUser = await usersCollection.findOne({
    username: sampleUser.username,
  });

  // Verify that the user is no longer in the database
  expect(deletedUser).toBeNull();
}, 30000);
