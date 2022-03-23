import React from "react";
import { useState } from "react";

function ChatBlock() {
  const [isChat, setIsChat] = useState(false);
  const handleSubmit = () => {
    console.log(1);
  };
  const handleFocus = () => {
    console.log(2);
    setIsChat(!isChat);
    console.log(isChat);
  };
  return (
    <div className="chat">
      <div className="emoji">😎😂🤔😭😱⌛</div>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Enter to Chat" onFocus={handleFocus} />
        </div>
      </form>
    </div>
  );
}

export default ChatBlock;
