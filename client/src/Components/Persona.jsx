import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Persona() {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageBase64 } = location.state || {};

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [scenario, setScenario] = useState('');

  const handleSave = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/set-character-prompt',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            introduction: bio,
            scenario: scenario,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseBody = await response.json();
      console.log(responseBody.message);

      // Navigate to /chat
      navigate('/chat', { state: { imageBase64, name } });
    } catch (error) {
      console.error('Error setting character prompt:', error);
    }
  };

  return (
    <Container>
      <Form>
        <h1>Edit Profile</h1>
        {imageBase64 ? (
          <ProfileImage
            src={`data:image/png;base64,${imageBase64}`}
            alt="Generated"
          />
        ) : (
          <p>No image available</p>
        )}
        <Label>Character name</Label>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter Character name"
        />
        <Label>Introduction</Label>
        <Textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Enter Character Introduction"
        />
        <Label>Scenario</Label>
        <Textarea
          value={scenario}
          onChange={e => setScenario(e.target.value)}
          placeholder="Enter Character Scenario"
        />
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const ProfileImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  resize: vertical;
`;

const SaveButton = styled.button`
  background: #dc2743;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #cc2366;
  }
`;
