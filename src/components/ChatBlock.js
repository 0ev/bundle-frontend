import React from "react";
import { useState } from "react";

function ChatBlock() {
  const [isChat, setIsChat] = useState(false);
  const handleSubmit = () => {
    setIsChat(true);
  };
  const handleFocus = () => {
    setIsChat(true);
  };
  const handleExit = () => {
    setIsChat(false);
  };
  const log = "blahblah";
  const chatLog = <div className="chatlog">{log}</div>;
  return (
    <div className={isChat ? "extended-chat" : "chat"}>
      <div className={isChat ? "extended-emoji" : "emoji"}>
        {isChat ? "😎😂🤔😭😱⌛😄😴💩😡👻⏰" : "😎😂🤔😭😱⌛"}
        {isChat ? (
          <button className="exit" onClick={handleExit}>
            x
          </button>
        ) : (
          ""
        )}
      </div>
      {isChat ? chatLog : ""}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className={isChat ? "extended-input" : "input"}
            placeholder="Enter to Chat"
            onFocus={handleFocus}
          />
        </div>
      </form>
    </div>
  );
}

export default ChatBlock;
