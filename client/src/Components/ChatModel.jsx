import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

export default function ChatModel() {
  const location = useLocation();
  const { imageBase64 } = location.state || {};
  const { name } = location.state || {};
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    const userMessage = {
      role: 'user',
      content: inputMessage,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseBody = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: responseBody.response, // 서버 응답 형식에 맞춰 수정
      };

      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInputMessage('');
  };

  return (
    <Container>
      <Header>
        {imageBase64 ? (
          <ProfileImage
            src={`data:image/png;base64,${imageBase64}`}
            alt="Profile"
          />
        ) : (
          <PlaceholderImage>No Image</PlaceholderImage>
        )}
        <HeaderText>{name}</HeaderText>
      </Header>
      <ChatContainer>
        {messages.map((message, index) => (
          <Message key={index} role={message.role}>
            {message.content}
          </Message>
        ))}
        <EndOfChatRef id="endOfChat" />
      </ChatContainer>
      <InputContainer>
        <ChatInput
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PlaceholderImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const Message = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ role }) => (role === 'user' ? '#dcf8c6' : '#fff')};
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 60%;
`;

const EndOfChatRef = styled.div`
  float: left;
  clear: both;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ddd;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #dc2743;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc2366;
  }
`;
