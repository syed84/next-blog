// pages/users/[email].js
import Blogs from "@/components/blogs";
import SubHeader from "@/components/sub-header";
import { getBlogByEmail } from "@/services/blog";
import { getUserByEmail } from "@/services/user";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function UserBlogs({ blogs, user }) {
  const pageTitle = user.firstName + " " + user.lastName;
  return (
    <div>
      <SubHeader>
        <Link href="/">
          <h2 className="pb-sub-header-title">{"< Go back to all blogs"}</h2>
        </Link>
      </SubHeader>

      <div style={{ paddingLeft: "160px" }}>
        <h1 className="pb-blog-title">{"All blogs from " + pageTitle}</h1>
        <Blogs blogs={[blogs]} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { email } = context.params;

  const blogs = getBlogByEmail(email);
  const user = getUserByEmail(email);

  return {
    props: {
      blogs,
      user,
    },
  };
}
