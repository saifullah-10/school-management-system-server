import { ObjectId } from "mongodb";
import { connectToDatabase } from "./connectToDB";

export const getUserByEmail = async (email: string) => {
  try {
    const db = await connectToDatabase();
    const usersColl = db.collection("users");
    const getByEmail = await usersColl.findOne({ email });

    return getByEmail;
  } catch (err) {
    console.error("User Not Found");
  }
};

export const createUser = async (
  email: string,
  password: string,
  salt: string,
  username: string
) => {
  const db = await connectToDatabase();
  const users = db.collection("users");
  const query = {
    email,
    username,
    authentication: {
      salt,
      password,
    },
  };
  const create = await users.insertOne(query);
  return create;
};

export const updateSessionToken = async (email: string, data: string) => {
  const db = await connectToDatabase();
  const users = db.collection("users");
  const options = { upsert: true };
  const updateUser = await users.updateOne(
    { email },
    { $set: { sessionToken: data } },
    options
  );
  return updateUser;
};
export const updateSessionTokenById = async (id: string, data: string) => {
  const db = await connectToDatabase();
  const users = db.collection("users");

  const updateUser = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { sessionToken: data } }
  );
  return updateUser;
};

export const getUserByToken = async (token: string) => {
  const db = await connectToDatabase();
  const users = db.collection("users");

  const userByToken = await users.findOne({ sessionToken: token });
  return userByToken;
};
