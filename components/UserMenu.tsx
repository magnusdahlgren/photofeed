"use client";

import { useEffect, useState } from "react";
import { SignOutButton } from "@/app/admin/SignOutButton";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
      setUserName(user?.email ?? "");
    }

    checkUser();
  }, []);

  return (
    <div className="user-menu-container">
      <button
        className={`avatar ${isSignedIn ? "signed-in" : "signed-out"}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isSignedIn && <span>{userName[0].toUpperCase()}</span>}
      </button>
      {isOpen && (
        <ul className="user-menu">
          {isSignedIn ? (
            <>
              <li>
                <Link href="/admin/" className="admin-button">
                  Admin
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </>
          ) : (
            <li>
              <Link href="/admin/login/" className="sign-in-button">
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
