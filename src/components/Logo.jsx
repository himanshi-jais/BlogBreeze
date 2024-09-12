import React from "react";
import LogoImg from "../assets/LogoImg.png";

function Logo({ width = "100px" }) {
  return (
    <div
      style={{
        width: width,
        height: width, // Make the container a square
        overflow: "hidden", // Hide overflow from zoom effect
        // borderRadius: "50%", // Make the container circular
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={LogoImg}
        alt=""
        style={{
          width: "100%", // Make image fill the container
          height: "100%", // Ensure the image covers the container
          objectFit: "cover", // Maintain aspect ratio and cover the container
          transform: "scale(1.2)", // Adjust the scale to zoom in
          // borderRadius: "50%", // Ensure the image also has a circular shape
        }}
      />
    </div>
  );
}

export default Logo;
