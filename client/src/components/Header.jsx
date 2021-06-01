import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header(props) {
  return (
    <header className="row " style={{margin:"0 -17px"}}>
    <div className="col-md-6">
      <h1 >
        <HighlightIcon />
        Keeper
      </h1>
      </div>
      <div className="col-md-6 ">
        <h3 className="text-end mt-2">{props.name}</h3>
      </div>
      
    </header>
  );
}

export default Header;

// className="my-0 d-inline-block" className="my-0 me-1 d-inline-block float-right"