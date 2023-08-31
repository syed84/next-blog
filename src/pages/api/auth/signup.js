import { getUserByEmail, saveUser } from "@/services/user";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(404).send();
  }
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = getUserByEmail(email);
    if (user) {
      res.status(409).send({ message: "User already exist" });
      return user;
    }
    saveUser(email, password, firstName, lastName);
    res.status(201).send();
  } catch (err) {
    res.status(400).json({ message: err });
  }
}
