import { useState } from "react";
// import "./assets/css/ChatBot.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import prompt from "./prompt";

const chatbot_key = "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";
const systemMessage = {
  role: "system",
  content: prompt,
};

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
      // stream: false,
    };

    // await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + chatbot_key,
    //     "Content-Type": "application/json",
    //     response_format: { type: "json_object" },
    //   },
    //   body: JSON.stringify(apiRequestBody),
    // })
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setMessages([
    //       ...chatMessages,
    //       {
    //         message: data.choices[0].message.content,
    //         sender: "ChatGPT",
    //         direction: "incoming",
    //       },
    //     ]);
    //     setIsTyping(false);
    //   });
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + chatbot_key,
        "Content-Type": "application/json",
        response_format: JSON.stringify({ type: "json_object" }), // JSON.stringify() is used to convert the object to a JSON string
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="content">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="Leadenhall Bot is typing" />
              ) : null
            }
          >
            {messages.map((message, i) => {
              console.log(message);
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            // autoCorrect={false}
            placeholder="Type message here"
            onSend={handleSend}
            defaultValue=""
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatBot;
