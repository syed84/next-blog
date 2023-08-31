import React from "react";

export default function SubHeader({ children }) {
  return (
    <div className="pb-sub-header">
      <div className="pb-sub-header-title">{children}</div>
    </div>
  );
}
