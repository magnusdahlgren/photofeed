"use client";

import { useState } from "react";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="user-menu-container">
      <button
        className="avatar"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        M
      </button>
      {isOpen && (
        <ul className="user-menu" role="menu">
          <li>
            <button>Option A</button>
          </li>
          <li>
            <button>Option B</button>
          </li>
          <li>
            <button>Option C</button>
          </li>
        </ul>
      )}
    </div>
  );
}
