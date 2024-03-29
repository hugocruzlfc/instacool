import React from "react";

export default function Main({ children, center }) {
  const classes = `Main ${center ? "Main--center" : ""}`;
  return <main className={classes}>{children}</main>;
}
