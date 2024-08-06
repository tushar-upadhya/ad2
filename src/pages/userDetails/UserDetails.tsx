import React from "react";
import { useParams } from "react-router-dom";
import { userRows } from "../../data";
import "./userDetails.scss";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = userRows.find((user) => user.id.toString() === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="userDetails">
      <h1>{user.firstName}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Created At: {user.createdAt}</p>
      <p>Verified: {user.verified ? "Yes" : "No"}</p>
    </div>
  );
};

export default UserDetails;
