import crypto from "crypto";
const SECRET = "SCH-MAN";

export const random = (): string => crypto.randomBytes(128).toString("base64");

export const authentication = (
  salt: string,
  password: string,
  uid?: string
): string => {
  const generate = crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
  if (uid) {
    const withUid = generate.slice(0, 10) + uid + generate.slice(10);
    return withUid;
  }
  return generate;
};
