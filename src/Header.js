import React from "react";

const Header = ({title}) => {
  return (
    <header
      style={{
        backgroundColor: "mediumaquamarine",
        color: "red",
      }}
    >
      {/* <h1> {props.title} </h1> */}
      <h1> {title} </h1>
    </header>
  );
};

Header.defaultProps = {
  title : "Default Title"
}

export default Header;
