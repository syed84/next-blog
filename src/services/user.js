import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAllUsers() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function getUserById(id) {
  const data = getAllUsers();
  return data.find((p) => p.id === Number(id));
}

export function getUserByEmail(email) {
  const data = getAllUsers();
  return data.find((p) => p.email?.toLowerCase() === email?.toLowerCase());
}

export async function verifyUserPassword(hashedPassword, password) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function saveUser(email, password, firstName, lastName) {
  const found = getUserByEmail(email);
  if (found) {
    throw new Error("User already exist.");
  }
  const data = getAllUsers();
  const hashedPassword = await hash(password, 12);
  data.push({
    id: Math.floor(Math.random() * 100),
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  fs.writeFileSync(filePath, JSON.stringify(data));
}
