import React from "react";

export function CornerBrackets({ className = "border-white/20" }) {
  return (
    <>
      <span className={`absolute left-3 top-3 h-5 w-5 border-l border-t ${className} pointer-events-none z-10`} />
      <span className={`absolute right-3 top-3 h-5 w-5 border-r border-t ${className} pointer-events-none z-10`} />
      <span className={`absolute bottom-3 left-3 h-5 w-5 border-b border-l ${className} pointer-events-none z-10`} />
      <span className={`absolute bottom-3 right-3 h-5 w-5 border-b border-r ${className} pointer-events-none z-10`} />
    </>
  );
}
