import React, { useState, useRef, useEffect } from "react";

// Mock UI components with basic styling to resolve import errors
const Card = ({ className, ...props }) => <div className={`bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg ${className}`} {...props} />;
const CardHeader = ({ className, ...props }) => <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${className}`} {...props} />;
const CardTitle = ({ className, ...props }) => <h3 className={`font-semibold tracking-tight ${className}`} {...props} />;
const CardDescription = ({ className, ...props }) => <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props} />;
const CardContent = ({ className, ...props }) => <div className={`p-4 ${className}`} {...props} />;
const Input = ({ className, ...props }) => <input className={`flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${className}`} {...props} />;
const Button = ({ className, ...props }) => <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4 ${className}`} {...props} />;
const ScrollArea = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={`overflow-y-auto ${className}`} {...props} />);


export default function App() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;
    setMessages((prev) => [...prev, { from: "user", text: currentInput }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });
      const data = await res.json();

      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: data.reply || "Sorry, I couldn’t respond." }]);
        setIsTyping(false);
      }, 800); // simulate typing delay
    } catch (err) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: "Sorry, I couldn’t respond." }]);
        setIsTyping(false);
      }, 800);
    }
  };

  return (
    <>
      {/* Floating Chat Button - Positioned bottom-right */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition transform hover:scale-110 flex items-center justify-center"
        >🤖
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chatbot Panel - Positioned bottom-right */}
      <div
        className={`fixed bottom-20 right-5 w-80 h-[500px] z-50 transform transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <Card className="flex flex-col h-full shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle>ChatBot</CardTitle>
            <CardDescription>I'm here to help you!</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea ref={scrollRef} className="flex-1 mb-4">
              <div className="flex flex-col space-y-3 p-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg max-w-[75%] break-words text-sm ${
                      msg.from === "bot"
                        ? "bg-gray-100 dark:bg-gray-700 self-start text-left"
                        : "bg-blue-600 text-white self-end text-right"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg self-start animate-pulse text-sm">
                    Bot is typing...
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="flex space-x-2 mt-auto border-t dark:border-gray-700 pt-4">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="dark:bg-gray-700 dark:text-white flex-1"
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

