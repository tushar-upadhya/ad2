import React from "react";
import Single from "../../components/single/Single";
import { singleUser } from "../../data";
import "./user.scss";

const User: React.FC = () => {
  return (
    <div className="user">
      <Single {...singleUser} />
    </div>
  );
};

export default User;
