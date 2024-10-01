import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from "./components/LandingPage";
import Details from "./components/Details";
import NewRide from "./components/NewRide";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import NewChat from './components/NewChat';
import Chat from './components/Chat';
import Signup from './components/SignUp';
import EditRide from './components/EditRide';
import Perfil from './components/Perfil';
import Requests from './components/Requests';
import Received_Requests from './components/Received_Requests';
import Sent_Requests from './components/Sent_Requests'
import NewRating from './components/NewRating'
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path="/newchat" element={<NewChat/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/newride" element={<NewRide/>}/>
        <Route path="/editride/:id" element={<EditRide/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
        <Route path="/requests" element={<Requests/>}/>
        <Route path="/requests_received" element={<Received_Requests/>}/>
        <Route path="/requests_sent" element={<Sent_Requests/>}/>
        <Route path="/new_rating/:id" element={<NewRating />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
