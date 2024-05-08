import * as MongoDb from "mongodb";
import { connectToCollection } from "../mongodb.js";

const usersCollection = connectToCollection("users");

export async function getUsers(queryParams) {
  const query =
    queryParams != undefined ? queryParams[0].split("=") : ["username", 1];
  const sortQuery = { [query[0]]: Number(query[1]) };

  return await usersCollection.find().sort(sortQuery).toArray();
}

export async function getUserByIdOrName(idOrName) {
  return await usersCollection.findOne({
    $or: [{ _id: new MongoDb.ObjectId(idOrName) }, { username: idOrName }],
  });
}

export async function createUser(userData) {
  return await usersCollection.insertOne(
    { _id: new MongoDb.ObjectId(), ...userData },
    {}
  );
}

export async function deleteUser(id) {
  return await usersCollection.deleteOne({ _id: new MongoDb.ObjectId(id) });
}
