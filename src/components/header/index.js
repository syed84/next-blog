import { Button, Row } from "antd";
import { signOut, useSession } from "next-auth/react";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header(user) {
  const pathName = usePathname();
  const { data: session } = useSession();

  return (
    <div className="pb-header">
      <Row gutter={16} type="flex" align="middle" justify="space-between">
        <Link href="/">
          <h2 className="pb-header-title">Personal Blogging App</h2>
        </Link>
        <Row gutter={16}>
          {!session && pathName !== "/auth/login" && (
            <Link href="/auth/login" passHref>
              <Button
                className="pb-login-btn pb-header-btn"
                type="text"
                size="small"
              >
                Login
              </Button>
            </Link>
          )}
          {!session && pathName !== "/auth/signup" && (
            <Link href="/auth/signup" passHref>
              <Button
                className="pb-signup-btn pb-header-btn"
                type="text"
                size="small"
              >
                Sign Up
              </Button>
            </Link>
          )}

          {session && pathName !== "/" && (
            <Link href="/">
              <Button
                className="pb-logout-btn pb-header-btn"
                type="text"
                size="small"
              >
                Dashboard
              </Button>
            </Link>
          )}
          {session && pathName !== "/profile" && (
            <Link href="/profile">
              <Button
                className="pb-logout-btn pb-header-btn"
                type="text"
                size="small"
              >
                Profile
              </Button>
            </Link>
          )}
          {session && (
            <Button
              className="pb-logout-btn pb-header-btn"
              type="text"
              size="small"
              onClick={() =>
                signOut({ redirect: true, callbackUrl: "/auth/login" })
              }
            >
              Log out
            </Button>
          )}
        </Row>
      </Row>
    </div>
  );
}
