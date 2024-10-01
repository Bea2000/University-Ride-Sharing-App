import React, { useState } from "react";
import styled from "styled-components";
import '../App.css';
import Button from "../button";
import css from "../default_design";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { createGlobalStyle } from 'styled-components'
import { Link } from "react-router-dom";

// urls
const BASE = "http://localhost:4000/users/login/";

const Login = () => {
    let navigate = useNavigate(); 
    const routeChange = (route) =>{ 
    let path = route; 
    navigate(path);
    }
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const onSubmitForm = async event => {
    event.preventDefault();
		// Acá vamos a mandar la HTTP request correspondiente
		const body = {
			"username": username,
			"password": password,
		};
		const response = await fetch(BASE, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body)
			});
		console.log(response);
		
		if (response.ok) {
			// Guardamos token en localStorage
			alert("Login exitoso!")
			const jsonResponse = await response.json();
			localStorage.setItem("token", jsonResponse.token);
			routeChange("../")
		} else {
			// Notificamos error y no asignamos token
			alert("Error de login")
		}
		// Limpiamos los campos del form
		event.target.reset();
		// Redireccionamos a pagina principal
	};

	const handleUserNameChange = (event) => {
		setUserName(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};


	return (
		<div>
		<Navbar></Navbar>
		<GlobalStyle whiteColor />
		<LoginS>
			<LoginHeader>
				<H3>LOG IN</H3>
			</LoginHeader>
			<LoginContent>
				<LoginForm onSubmit={onSubmitForm}>
					<Input 
						required
						className="" 
						placeholder="Username"
						onChange={handleUserNameChange}
					/>
					<Input 
						type="password"
						required
						className="" 
						placeholder="Password"
						onChange={handlePasswordChange}
					/>
					<StyledButton>Log In</StyledButton>
				</LoginForm>
			</LoginContent>
		<P>¿No tienes cuenta? Puedes ir a <Button to="/signup">Sign up</Button></P>
		<Back to={'../'}>Volver</Back>
		</LoginS>
		</div>
	)
};

// styled components

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.whiteColor ? '${design.designs.map((d) => (d.bodycolor))' : 'black')};
  }
`

const Back = styled(Button)`
	width: 20%;
	margin-left: auto;
	margin-bottom: 5%;
	margin-right: 3%;
`

const P = styled.p`
	margin-left: 10px;
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


const LoginS = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow:0px 0px 0px 2px black inset;
	width: 60%;
	height: 50%;
	row-gap: 20px;
	border: 3px solid black;
	border-radius: 5px;
	margin: auto;
	margin-top: 10%;
`

const LoginHeader = styled.div`
	display: flex;
	padding: 10px 10px 10px 10px;
	flex-direction: row;
	justify-content: center;
	column-gap: 30px;
	border-radius: 5px;
	background-color: black;
`;

const LoginContent = styled.div`
    display: flex;
  	flex-direction: column;
`;

const LoginForm = styled.form`
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

export default Login;