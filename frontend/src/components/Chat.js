import React, { useEffect, useState } from "react";
import styled from "styled-components";
import '../App.css';
import Button from "../button";
import css from "../default_design";
import Navbar from "./Navbar";
import { createGlobalStyle } from 'styled-components'
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

const Chat = () => {

    const { id } = useParams(); 

    const location = useLocation();
    const API = `http://localhost:4000/chats/${id}`;
    const messageAPI =  `http://localhost:4000/messages/`

    useEffect(() => {
        // Aca recopilamos los mensajes de un chat
        const getAPI = () => {

            fetch(API)
                .then((response) => {
                    //console.log(response);
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                    setApiData(data);
                });
            
        };
        getAPI();
        const getRide = () => {
            const API = `http://localhost:4000/rides/${id}`;
    
            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setRideData(data);
                });
        };
        getRide();
    }, []);

	const [apiData, setApiData] = useState([]);
    const [rideData, setRideData] = useState("");
    const [message, setMessage] = useState("");

	const onSubmitMessage = async event => {
        // Aca enviamos un mensaje a un chat

        event.preventDefault();

        const token = localStorage.getItem('token');
        const body = {
            "chatId": id,
            "content": message,
			"token": token
        };
        
		const response = await fetch(messageAPI, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then((response) => {
                    //console.log(response);
                    return response.json();
                })
                .then((data) => {
                    //console.log(data);
                    setApiData(prev => [...prev,data]);
                });;

		//console.log(response);
	
		// Limpiamos los campos del form
		event.target.reset();

	};

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	return (
		<div>
		<Navbar></Navbar>
		<GlobalStyle whiteColor />
		<ChatS>
			<ChatHeader>
				<H3>CHAT</H3>
			</ChatHeader>
			<ChatContent>
            <br></br>
            <Div theme={SmallBox}>
                {apiData.map((message) => (
                    <div>
                        <P>{message.user}:</P> 
                        {rideData.driver == message.user ? (
                                    <PDriver>{message.body}</PDriver>
                                ) : (
                                    <PUser>{message.body}</PUser>
                                )}
                    </div>
                ))}
            </Div>
                
                
				<ChatForm onSubmit={onSubmitMessage}>
                
					<Input 
						required
						className="" 
						placeholder="Escribe tu mensaje aquí"
						onChange={handleMessageChange}
					/>
					<StyledButton>Enviar</StyledButton>
				</ChatForm>
			</ChatContent>
		<Back to={'../'}>Volver</Back>
		</ChatS>
		</div>
	)
};

// styled components

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.whiteColor ? '${design.designs.map((d) => (d.bodycolor))' : 'black')};
  }
`
const SmallBox = {
    border: "none",
    dir: "column",
    padl: "0px",
    aligni: "flex-start",
    aligns: "flex-start",
    margin: "auto",
    margind: "auto",

};

const Back = styled(Button)`
	width: 20%;
	margin-left: auto;
	margin-bottom: 5%;
	margin-right: 3%;
`

const P = styled.p`
    margin: 0px;
	margin-left: 38px;
    font-weight: 500;
    font-size: 14px;
    padding: 0px;
`
const PUser = styled.p`
    margin: 0px;
    margin-left: 30px;
    background: rgba(30, 69, 111  ,0.5);
    border-radius: 25px;
    font-weight: bold;
    border: 3px solid #fff;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 3%;
`

const PDriver = styled.p`
    margin: 0px;
    margin-left: 30px;
    background: rgba(149, 215, 206,0.5);
    border-radius: 25px;
    font-weight: bold;
    border: 3px solid #fff;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 3%;
`
const StyledButton = styled.button`
	background-color: ${css.buttoncolor};
	color: ${css.buttontextcolor}; 
	padding: 0.5em 1em;
	border: 0;
	border-radius: 30px;
	text-align: center;
	white-space: nowrap;
	cursor: pointer;
	font-family: ${css.defaultfont};
	font-size: 14px;
	text-decoration: none;
    margin-left: 5%;
	margin-right: 5%;
`;


const ChatS = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow:0px 0px 0px 2px black inset;
	width: 60%;
	height: 50%;
	row-gap: 20px;
	border: 3px solid black;
	border-radius: 5px;
	margin: auto;
	margin-top: 2%;
`

const ChatHeader = styled.div`
	display: flex;
	padding: 10px 10px 10px 10px;
	flex-direction: row;
	justify-content: center;
	column-gap: 30px;
	border-radius: 5px;
	background-color: black;
`;

const ChatContent = styled.div`
    display: flex;
  	flex-direction: column;
`;

const ChatMessage = styled.div`
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
  	flex-direction: column;
`;

const ChatForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

const Input = styled.input`
    margin-left: 5%;
	margin-right: 5%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #24292e;
    vertical-align: middle;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: right 8px center;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    outline: none;
    box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset;
    :focus{
        border-color: #0366d6;
        outline: none;
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`

const H3 = styled.h3`
    font-size: 18px;
	margin-left: 10px;
    color: ${css.titlecolor};
    font-family: ${css.titlefont};
`
const Div = styled.div`
    display: flex;
    flex-direction: ${props => props.theme.dir};
    align-items: ${props => props.theme.aligni};
    justify-content: ${props => props.theme.aligns};
    margin-right: 5%;
`;


export default Chat;
