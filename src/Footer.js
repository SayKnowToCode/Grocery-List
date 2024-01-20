import React from "react";

const Footer = ({length}) => {

  const footerStyle = {
    backgroundColor: "mediumblue",
    color: "white",
  };

  return (
    <footer style={footerStyle}>

      { (length) ? 
        (<p>{length} List { (length === 1) ? "item" : "items"} </p> 
      ) : (
        <p> List is Empty </p>) 
      }

    </footer>
  );
};

export default Footer;
