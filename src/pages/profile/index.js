import React from "react";
import { getSession } from "next-auth/react";
import SubHeader from "@/components/sub-header";
import Image from "next/image";

function Profile({ session }) {
  return (
    <div>
      <SubHeader>
        <h2 className="pb-sub-header-title">Profile</h2>
      </SubHeader>
      <div
        style={{ backgroundColor: "#ffffff", maxWidth: "881px", width: "100%" }}
      ></div>
    </div>
  );
}

export default Profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
