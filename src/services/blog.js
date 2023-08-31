import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "blogs.json");

export function getAllBlogs() {
  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
}
export function deleteBlogByEmailAndId(email, blogId) {
  const data = getAllBlogs();

  const user = data.find((user) => user.email === email);

  if (user) {
    const blogIndex = user.blogs.findIndex(
      (blog) => blog.id === Number(blogId)
    );

    if (blogIndex !== -1) {
      user.blogs.splice(blogIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(data));

      return `Deleted blog with id ${blogId} for user ${email}`;
    } else {
      console.error(`Blog with id ${blogId} not found for user ${email}`);
    }
  } else {
    console.error(`User with email ${email} not found`);
  }
}
export function getBlogByEmail(email) {
  if (!email) return;
  const data = getAllBlogs();
  const foundData = data.find(
    (b) => b.email.toLowerCase() === email.toLowerCase()
  );

  return foundData;
}

export async function updateBlog(email, title, body, blogId) {
  const data = getAllBlogs();

  const found = getBlogByEmail(email);
  if (found) {
    data.filter((b) => {
      if (b.email === email) {
        b.blogs.filter((userBlog) => {
          if (userBlog.id === blogId) {
            userBlog.title = title;
            userBlog.body = body;
          }
        });
      }
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(data));
}

export async function saveBlog(email, title, body) {
  const data = getAllBlogs();

  const found = getBlogByEmail(email);
  if (found) {
    data.filter((b) => {
      if (b.email === email) {
        b.blogs.push({
          title,
          body,
          id: Math.floor(Math.random() * 100),
          "published-date": Date.now(),
        });
      }
    });
  } else {
    data.push({
      email,
      blogs: [
        {
          title,
          body,
          id: Math.floor(Math.random() * 100),
          "published-date": Date.now(),
        },
      ],
    });
  }

  fs.writeFileSync(filePath, JSON.stringify(data));
}
