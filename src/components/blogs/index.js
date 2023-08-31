import { Button, Popconfirm } from "antd";
import Link from "next/link";
import React from "react";

function Blogs({ blogs, isLogin, onDelete, onEdit }) {
  return (
    <>
      <div
        className="pb-blogs"
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          maxWidth: "880px",
          width: "100%",
        }}
      >
        {blogs?.map((user) => {
          return user.blogs.map((blog, index) => {
            const date = new Date(blog["published-date"]).toDateString();
            return (
              <div
                key={index}
                className="pb-single-blog"
                style={{ backgroundColor: "#ffffff", padding: "20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                  }}
                >
                  <div>
                    <h2 style={{ margin: "0" }}>{blog.title}</h2>
                    <p>{date}</p>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <p style={{ margin: "0", lineHeight: "1.7" }}>{blog.body}</p>
                </div>
                {isLogin && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Popconfirm
                      title="Delete the blog"
                      description="Are you sure to delete this blog?"
                      onConfirm={() => onDelete(blog.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        size="small"
                        type="text"
                        style={{ color: "#7749F8" }}
                      >
                        Delete
                      </Button>
                    </Popconfirm>

                    <Button
                      onClick={() => onEdit(blog.title, blog.body, blog.id)}
                      size="small"
                      type="text"
                      style={{ color: "#7749F8" }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
                {!isLogin && (
                  <Link href={`/users/${user.email}`}>
                    <Button
                      size="small"
                      type="text"
                      style={{ color: "#7749F8" }}
                    >
                      See all from this user
                    </Button>
                  </Link>
                )}
              </div>
            );
          });
        })}
      </div>
    </>
  );
}

export default Blogs;
