import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Generate() {
  const [textPrompt, setTextPrompt] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/generate/persona', { state: { imageBase64 } });
  };

  const handleGenerateImage = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text_prompt: textPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseBody = await response.json();
      console.log(responseBody);
      setImageBase64(responseBody.artifacts[0].base64);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <Container>
      <Form>
        <h1>Generate Image</h1>
        <Input
          type="text"
          value={textPrompt}
          onChange={e => setTextPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <Button onClick={handleGenerateImage}>Generate</Button>
        {imageBase64 && (
          <ImageContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src={`data:image/png;base64,${imageBase64}`}
              alt="Generated"
            />
            {isHovered && (
              <Overlay>
                <PersonaButton onClick={handleStartClick}>
                  Persona Injection
                </PersonaButton>
              </Overlay>
            )}
          </ImageContainer>
        )}
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
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const Button = styled.button`
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

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const PersonaButton = styled.button`
  background: white;
  color: #dc2743;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #cc2366;
    color: white;
  }
`;
