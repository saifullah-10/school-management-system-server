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
      return res.status(403).json({ message: "Email And Password Require" });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid Email OR Password" });
    }

    const expectedPass = authentication(user.authentication.salt, password);
    const usserPass = user.authentication.password;
    if (expectedPass !== usserPass) {
      return res.status(400).json({ message: "Email or password mismatch" });
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token: accessToken });
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
    const { email, password, username, role, photourl } = req.body;
    if (!email || !password || !username || !role) {
      return res.status(403).json({ message: "All Fields Are Require" });
    }
    //check already user exist in the dtabase
    const existingUser = await getUserByEmail(email);

    //create a new user
    if (!existingUser) {
      const salt = random();

      const hashPass = authentication(salt, password);
      const user = await createUser(
        email,
        hashPass,
        salt,
        username,
        role,
        photourl
      );

      if (user.acknowledged) {
        const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });

        return res.status(200).json({ token: accessToken });
      } else {
        return res.status(400).json({ message: "user not created" }).end();
      }
    }
    return res.status(400).json({ message: "User Already Exist" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "user not created", ...err })
      .end();
  }
};

// //logout

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

// //isUser

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
