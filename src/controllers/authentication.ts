import express from "express";
import dotEnv from "dotenv";
dotEnv.config();
import { createUser, getUserByEmail, updateSessionToken } from "../db/user";
import { authentication, random } from "../helpers/hashPassword";
import { get, merge } from "lodash";
import jwt from "jsonwebtoken";

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
    res.send(email);
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "10d",
    });

    const setInDb = await updateSessionToken(email, refreshToken);
    if (setInDb.modifiedCount) {
      return res.status(200).json({ token: accessToken });
    } else {
      return res.status(403).json({ message: "forbidden" });
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
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    return res.status(200).json({ logout: true });
  } catch (err) {
    console.error(err);
  }
};

//isUser

export const isUser = async (req: express.Request, res: express.Response) => {
  const user = get(req, "identity");
  if (user) {
    return res.status(200).json(merge(user, { message: "from protected" }));
  }
};

//refresh token
// export const refreshToken = async () => {
//   try {
//     const user = getUserByToken();
//   } catch (err) {}
// };
