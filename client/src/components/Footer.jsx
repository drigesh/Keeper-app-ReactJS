import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div>
      <p>ⓒ Copyright {year} Drigesh co.</p>
      </div>
    </footer>
  );
}

export default Footer;
