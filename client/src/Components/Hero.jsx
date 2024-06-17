import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/generate');
  };

  return (
    <>
      <div>
        <MotionDiv
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heading>
            <GradientText>don't be lonely,</GradientText>
            <br />
            <TypeAnimation
              sequence={[
                'Talk whenever you want',
                1000,
                'With the person you want',
                1000,
                'With the face you want',
                1000,
                'Take your time',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </Heading>
        </MotionDiv>
      </div>

      <StartButton onClick={handleStartClick}>Start</StartButton>
    </>
  );
};

export default Hero;

const MotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const Heading = styled.h1`
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;

  @media (min-width: 640px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 5rem;
    line-height: normal;
  }
`;

const GradientText = styled.span`
  color: white;
`;

const StartButton = styled.button`
  background: white;
  margin-bottom: 60px;
  color: #cc2366;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;

  &:hover {
    opacity: 70%;
  }
`;
