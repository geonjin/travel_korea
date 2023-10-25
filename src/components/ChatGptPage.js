import Layout from "../Layout/Layout";
import React, { useEffect, useRef, useState } from "react";

const ChatGptPage = () => {
  const [messages, setMessages] = useState([
    {
      content: '안녕하세요!\n국내 여행지 정보 챗봇 "티코"입니다. ',
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [state, setState] = useState(0);
  const messageEndRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    // User question
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: inputValue, isUser: true },
    ]);

    setState(state + 1);
  };

  useEffect(() => {
    if (messages.length === 1) return;

    fetch("http://localhost:3001/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    })
      .then((res) => res.json())
      .then((json) => {
        const response = json.message;
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: response, isUser: false },
        ]);
      });

    setInputValue("");
  }, [state]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Layout>
        <div className="flex justify-center mt-20">
          <div className="chatbot-container bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="chatbot-header py-3 px-4 bg-green-700 text-white rounded-t-lg">
              <h2 className="text-lg font-bold">챗봇검색</h2>
            </div>
            <div className="chatbot-messages py-4 px-4 h-80 overflow-y-scroll">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"
                    } mb-4`}
                >
                  <div
                    className={`${message.isUser ? "bg-gray-400" : "bg-gray-500"
                      } inline-block py-2 px-4 rounded-lg text-white max-w-[70%] whitespace-pre-wrap`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef}></div>
            </div>
            <div className="py-3 px-4 bg-gray-100 rounded-b-lg">
              <form className="flex" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  className="flex-1 mr-2 py-2 px-4 rounded-full bg-white"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-teal-600 text-white py-2 px-4 rounded-full"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ChatGptPage;