import {
  deleteBlogByEmailAndId,
  getAllBlogs,
  getBlogByEmail,
  saveBlog,
  updateBlog,
} from "@/services/blog";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      saveBlog(email, title, body);
      return res.status(201).json({ message: "Blog post saved successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  if (req.method === "DELETE") {
    const { email, blogId } = req.query;
    deleteBlogByEmailAndId(email, blogId);
  }
  if (req.method === "PUT") {
    const { blogId, title, body, email } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      updateBlog(email, title, body, blogId);
      return res.status(201).json({ message: "Blog post saved successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  if (req.method === "GET") {
    const { email, getBy } = req.query;
    let blogs = [];

    const foundBlogs = getBlogByEmail(email);

    if (getBy === "email" && foundBlogs) {
      blogs.push(foundBlogs);
    }
    if (getBy === "all") {
      blogs = getAllBlogs();
    }

    return res.status(200).json(blogs);
  }

  return res.status(404).json({ message: "Resource not found" });
}
