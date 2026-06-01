import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

export function createResetToken() {
  return crypto.randomBytes(32).toString("hex");
}
