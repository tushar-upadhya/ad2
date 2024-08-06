import "./topBox.scss";
import { plants } from "../../data.ts";

const TopBox = () => {
  return (
    <div className="topBox">
      <h1>Plants</h1>
      <div className="list">
        {plants.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
              </div>
            </div>
            <span className="amount">${user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
