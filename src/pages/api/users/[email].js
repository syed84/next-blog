import { getBlogByEmail } from "@/services/blog";

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const blogs = await getBlogByEmail(email);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
}
