import { connectToDatabase } from "./connectToDB";

export const getUserByEmail = async (email: string) => {
  try {
    console.log(email);
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
