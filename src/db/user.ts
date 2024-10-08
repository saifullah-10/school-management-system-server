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
  username: string,
  role: string,
  photourl: string
) => {
  const db = await connectToDatabase();
  const users = db.collection("users");
  const query = {
    email,
    role,
    username,
    photoUrl: photourl,
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
    { $set: { refreshToken: data } },
    options
  );
  return updateUser;
};
export const updateSessionTokenById = async (id: string, data: string) => {
  const db = await connectToDatabase();
  const users = db.collection("users");

  const updateUser = await users.updateOne(
    { _id: new ObjectId(id) },
    { $set: { refreshToken: data } }
  );
  return updateUser;
};

export const getUserByToken = async (token: string) => {
  const db = await connectToDatabase();
  const users = db.collection("users");

  const userByToken = await users.findOne({ refreshToken: token });
  return userByToken;
};

export const getAllUser = async () => {
  try {
    const db = await connectToDatabase();
    const users = db.collection("users");
    const allUser = await users.find().toArray();
    return allUser;
  } catch (err) {
    return err;
  }
};
