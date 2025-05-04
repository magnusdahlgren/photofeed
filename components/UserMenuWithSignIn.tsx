"use client";

import { useState } from "react";
import { UserMenu } from "./UserMenu";
import { SignInDialog } from "./SignInDialog";

export function UserMenuWithSignIn() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <UserMenu onRequestSignIn={() => setShowDialog(true)} />
      {showDialog && <SignInDialog onClose={() => setShowDialog(false)} />}
    </>
  );
}
