import React from "react";

function Navbar() {
  return (
    <>
      <div className="navbar flex justify-between px-4 align-center py-5 bg-gray-400">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="links flex justify-between align-center gap-9 ">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
