import SubHeader from "../sub-header";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BlogForm from "../blog-form";
import { Spin } from "antd";
import Blogs from "../blogs";

function LoginDashBoard() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({ title: "", body: "" });
  const [editingBlog, setEditingBlog] = useState({ status: false, blogId: -1 });
  const [allBlogs, setAllBlogs] = useState([]);
  const [greeting, setGreeting] = useState("Good Morning Readers!");
  const [allBlogsLoading, setAllBlogsLoading] = useState(false);

  const { data: session } = useSession();

  const getAllBlogs = async () => {
    setAllBlogsLoading(true);
    try {
      const data = await (
        await fetch(
          `/api/blog?email=${session?.user?.email}&getBy=${
            session ? "email" : "all"
          }`,
          {
            method: "GET",
          }
        )
      ).json();

      setAllBlogs(data);
      setAllBlogsLoading(false);
    } catch (err) {
      setAllBlogsLoading(false);

      console.error(err);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [session]);
  const setGreetingMessage = () => {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();

    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon");
    } else if (currentHour < 22) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }
  };
  useEffect(() => {
    setGreetingMessage();
  }, []);
  const onSubmit = async () => {
    try {
      if (!session || blog.title === "" || blog.body === "") {
        return;
      }
      setLoading(true);

      const response = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify({ ...blog, email: session?.user?.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      location.reload();

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const onDelete = async (blogId) => {
    try {
      if (!session) {
        return;
      }

      const response = await fetch(
        `/api/blog?email=${session.user.email}&blogId=${blogId}`,
        {
          method: "DELETE",
        }
      );
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const onEdit = (title, body, blogId) => {
    setBlog({ title, body });
    setEditingBlog({ status: true, blogId });
  };
  const onUpdate = async () => {
    try {
      if (!session) {
        return;
      }

      const response = await fetch(`/api/blog`, {
        method: "PUT",
        body: JSON.stringify({
          ...blog,
          blogId: editingBlog.blogId,
          email: session?.user?.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const blogProps = {
    blog,
    setBlog,
    loading,
    onSubmit,
    editingBlog,
    onUpdate,
  };
  const hasBlogs = allBlogs.length > 0;
  const pageTitle = session ? "My Blogs" : "All Blogs";
  return (
    <>
      <SubHeader>
        {session && <h2 className="pb-sub-header-title">Dashboard</h2>}
        {!session && <h2 className="pb-sub-header-title">{greeting}</h2>}
      </SubHeader>
      <div style={{ paddingLeft: "160px", paddingBottom: "50px" }}>
        {session && <BlogForm {...blogProps} />}
        <h1 className="pb-blog-title">{pageTitle}</h1>
        {!hasBlogs && allBlogsLoading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!hasBlogs && !allBlogsLoading && session && (
          <p>You don't have any published blogs</p>
        )}
        {hasBlogs && !allBlogsLoading && (
          <Blogs
            blogs={allBlogs}
            isLogin={session}
            onDelete={onDelete}
            editingBlog={editingBlog}
            setEditingBlog={setEditingBlog}
            onEdit={onEdit}
          />
        )}
      </div>
    </>
  );
}

export default LoginDashBoard;
