"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const sampleResponses: Record<string, string> = {
  hello: "Hello! Welcome to Tandem Care. How can I help you today?",

  hi: "Hi! Welcome to Tandem Care. How can I help you?",

  services:
    "Tandem Care provides a range of support services. You can visit our Services page to learn more about the support we provide.",

  contact:
    "You can contact Tandem Care through our Contact Us page. Our team will be happy to assist you.",

  careers:
    "You can visit our Careers section to view available job opportunities, graduate programmes and internships.",

  default:
    "Thanks for your message. This is a sample chatbot. You can connect it to your Laravel AI API later for intelligent responses.",
};

function getBotResponse(message: string): string {
  const text = message.toLowerCase();

  if (text.includes("hello")) {
    return sampleResponses.hello;
  }

  if (text.includes("hi")) {
    return sampleResponses.hi;
  }

  if (text.includes("service") || text.includes("support")) {
    return sampleResponses.services;
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("phone")
  ) {
    return sampleResponses.contact;
  }

  if (
    text.includes("career") ||
    text.includes("job") ||
    text.includes("internship")
  ) {
    return sampleResponses.careers;
  }

  return sampleResponses.default;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    const trimmedMessage = input.trim();

    if (!trimmedMessage || isTyping) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);

    setInput("");

    setIsTyping(true);

    // Sample bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(trimmedMessage),
      };

      setMessages((previous) => [...previous, botMessage]);

      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Button */}

      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#FCB040]
            text-[#003366]
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:shadow-xl
          "
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}

      {/* Chat Window */}

      {isOpen && (
        <div
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-[600px]
            w-[380px]
            max-w-[calc(100vw-32px)]
            flex-col
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-2xl
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              bg-[#003366]
              px-5
              py-4
              text-white
            "
          >
            <div>
              <h3 className="font-semibold">Tandem Care Assistant</h3>

              <p className="text-xs text-white/70">We&apos;re here to help</p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="
                rounded-full
                p-2
                text-white
                transition
                hover:bg-white/10
              "
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%]
                      rounded-2xl
                      px-4
                      py-3
                      text-sm
                      ${
                        message.sender === "user"
                          ? "rounded-br-sm bg-[#003366] text-white"
                          : "rounded-bl-sm bg-white text-gray-800 shadow-sm"
                      }
                    `}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}

              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="
                      rounded-2xl
                      rounded-bl-sm
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-gray-500
                      shadow-sm
                    "
                  >
                    Typing...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}

          <div className="border-t bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                disabled={isTyping}
                className="
                  flex-1
                  rounded-full
                  border
                  border-gray-300
                  bg-[#0B1428]
                  px-4
                  py-3
                  text-sm
                  text-white
                  placeholder:text-gray-400
                  outline-none
                  transition
                  focus:border-[#FCB040]
                  focus:ring-1
                  focus:ring-[#FCB040]
                "
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={isTyping || !input.trim()}
                aria-label="Send message"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FCB040]
                  text-[#003366]
                  transition
                  hover:scale-105
                  hover:bg-[#f5a72f]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
