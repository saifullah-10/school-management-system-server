import express from "express";
import { createUser, getUserByEmail, updateSessionToken } from "../db/user";
import { authentication, random } from "../helpers/hashPassword";

//login controller
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
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
    const createToken = authentication(salt, user._id.toString());
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

        const createSessionToken = authentication(
          salt,
          getUser?._id.toString()
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
    const { email } = req.body;
    if (!email) {
      return res.status(403).json({ message: "Email is Required" });
    }
    const updateToken = await updateSessionToken(email, "");
    if (updateToken) {
      res.clearCookie("us-tk", { domain: "localhost", path: "/" });
      return res.status(200).json({ logout: true, message: "Logout Success" });
    }
    return res.status(400).json({ logout: false, message: "Try Again" });
  } catch (err) {
    console.error(err);
  }
};
