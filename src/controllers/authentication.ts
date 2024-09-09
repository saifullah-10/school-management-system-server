import express from "express";
import {
  createUser,
  getUserByEmail,
  updateSessionToken,
  updateSessionTokenById,
} from "../db/user";
import { authentication, random } from "../helpers/hashPassword";
import { get, merge } from "lodash";

//login controller
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(403)
        .json({ message: "Email and Password are required" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(403).json({ message: "Invalid Email Or Password" });
    }
    const expectedHash = authentication(user.authentication.salt, password);

    const dbPass = user.authentication.password;

    if (expectedHash !== dbPass) {
      return res.status(400).json({ message: "Email Or Password Mismatch" });
    }

    const salt = random();
    const uid = user?._id;
    const createToken = authentication(salt, user._id.toString(), uid);

    const updateToken = await updateSessionToken(email, createToken);
    if (updateToken) {
      user.sessionToken = createToken;
      res.cookie("us-tk", user?.sessionToken, {
        domain: "localhost",
      });

      return res.status(200).json(user).end();
    }
  } catch (err) {
    console.error(err);
  }
};

//registration controller

export const registration = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(403).json({ message: "All Fields Are Require" });
    }
    //check already user exist in the dtabase
    const existingUser = await getUserByEmail(email);

    //create a new user
    if (!existingUser) {
      const salt = random();

      const hashPass = authentication(salt, password);
      const user = await createUser(email, hashPass, salt, username);

      if (user) {
        const getUser = await getUserByEmail(email);
        const uid = getUser?._id;
        const createSessionToken = authentication(
          salt,
          getUser?._id.toString(),
          uid
        );

        const updateToken = await updateSessionToken(email, createSessionToken);
        if (updateToken) {
          getUser.sessionToken = createSessionToken;
          res.cookie("us-tk", getUser?.sessionToken, {
            domain: "localhost",
          });
          return res.status(200).json(updateToken).end();
        }
      }
      return res.status(200).json(user).end();
    }
    return res.status(400).json({ message: "User Already Exist" });
  } catch (err) {
    console.log(err);
  }
};

//logout

export const logoutUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Unauthorrized" });
    }
    const updateToken = await updateSessionTokenById(id, "");
    if (updateToken) {
      res.clearCookie("us-tk", { domain: "localhost", path: "/" });
      return res.status(200).json({ logout: true, message: "Logout Success" });
    }
    return res.status(400).json({ logout: false, message: "Try Again" });
  } catch (err) {
    console.error(err);
  }
};

//isUser

export const isUser = async (req: express.Request, res: express.Response) => {
  const user = get(req, "identity");
  if (!user) {
    return res.status(400).json({ success: false });
  }
  return res.status(200).json(merge(user, { success: true }));
};
