"use client";

import { useEffect, useRef, useState } from "react";
import { SignOutButton } from "@/components/SignOutButton";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { SignInButton } from "./SignInButton";

interface UserMenuProps {
  onRequestSignIn: () => void;
}

export function UserMenu({ onRequestSignIn }: Readonly<UserMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    async function checkUser() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        const user = session?.user;

        if (error) {
          console.error("Error fetching user:", error);
          setIsSignedIn(false);
          return;
        }

        setIsSignedIn(!!user);
        setUserName(user?.email ?? "");
      } catch (error) {
        console.error("Exception when checking authentication:", error);
        setIsSignedIn(false);
      }
    }

    checkUser();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
      setUserName(session?.user?.email ?? "");
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div ref={menuRef} className="user-menu-container">
      <button
        className={`avatar ${isSignedIn ? "signed-in" : "signed-out"}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isSignedIn && (
          <span>
            {userName && userName.length > 0 ? userName[0].toUpperCase() : "?"}
          </span>
        )}
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
              <SignInButton onClick={onRequestSignIn} />
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
