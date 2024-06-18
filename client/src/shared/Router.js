import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GenerateProfile from '../pages/GenerateProfile';
import Generate from '../components/Generate';
import Persona from '../components/Persona';
import ChatModel from '../components/ChatModel';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerateProfile />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/persona" element={<Persona />} />
        <Route path="/chat" element={<ChatModel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
