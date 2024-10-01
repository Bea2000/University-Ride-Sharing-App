import React from "react";
import styled from 'styled-components';
import css from "../default_design";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'

const NewRide = () => {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `../`; 
    navigate(path);
    }

    const createChat = async (event, rideId) => {
        event.preventDefault();
        
        // Agregamos token al body de la request
        const token = localStorage.getItem('token');
        const body = {
            "token": token,
            "rideId": rideId
        };
    
            console.log(body);
            const response = await fetch("http://localhost:4000/chats/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            console.log(response);
      };

    function handleFormSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        if(formJSON.direccion == "false"){
            formJSON.direccion = false;
        } else{
            formJSON.direccion=true;
        };
        // Agregamos token al body de la request
        formJSON.token = localStorage.getItem('token');
        fetch("http://localhost:4000/rides/new-ride",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formJSON)
          })
            .then((response) => {
                console.log(response);
                if (response.status != 201){
                    alert("Error al crear viaje");
                } else{
                    alert("Viaje creado!");
                    routeChange();
                }
                return response.json();
            })
            .then((data) => {
                console.log(`aaaaaaaaaaaaaaaaaaaaaa`);
                console.log(data.id)
                const rideId = data.id
                createChat(event, rideId);
            });
        
      }

    return (
    <div>
        <GlobalStyle whiteColor />
        <Navbar></Navbar>
        <Div>
            <Header>
				<H3>CREAR VIAJE</H3>
			</Header>
            <Content>
            <Form onSubmit={handleFormSubmit}>
                <InputDiv>Comuna<Input type="text" name="comuna"/></InputDiv>
                <InputDiv>Modelo<Input type="text" name="modelo"/></InputDiv>
                <InputDiv>Patente<Input type="text" name="patente"/></InputDiv>
                <InputDiv>Precio<Input type="number" min={0} name="precio"/></InputDiv>
                <InputDiv>Campus<Select name="campus">
                    <Option value={"San Joaquin"}>San Joaquin</Option>
                    <Option value={"Lo Contador"}>Lo Contador</Option>
                    <Option value={"Campus Oriente"}>Campus Oriente</Option>
                    <Option value={"Casa Central"}>Casa Central</Option>
                </Select></InputDiv>
                <InputDiv>Direccion<Select name="direccion">
                    <Option value={false}>Desde UC</Option>
                    <Option value={true}>Hasta UC</Option>
                </Select></InputDiv>
            <ButtonDiv>
                <Button type="submit">Crear Viaje</Button>
                <Button onClick={routeChange}>Volver</Button>
            </ButtonDiv>
                </Form>
                </Content>
        </Div>
        <br></br>
    </div>
    )
};
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.whiteColor ? '${design.designs.map((d) => (d.bodycolor))' : 'black')};
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin: 5%;
`
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5%;
`
const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${css.defaultfont};
`
const Content = styled.div`
    display: flex;
  	flex-direction: column;
`;
const Div = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow:0px 0px 0px 2px black inset;
	width: 30%;
	height: 50%;
	row-gap: 20px;
	border: 3px solid black;
	border-radius: 5px;
	margin: auto;
	margin-top: 5%;
`
const H3 = styled.h3`
    font-size: 18px;
	margin-left: 10px;
    color: ${css.titlecolor};
    font-family: ${css.titlefont};
`
const Header = styled.div`
	display: flex;
	padding: 10px 10px 10px 10px;
	flex-direction: row;
	justify-content: center;
	column-gap: 30px;
	border-radius: 5px;
	background-color: black;
`

const Button = styled.button`
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
    width: 100px;
    margin-right: 2%;
`
const Option = styled.option`
    background: black;
    border-radius: 10px;
    text-align: center;
    font-family: ${css.defaultfont};
`
const Select = styled.select`
    margin-left: 25%;
    background: black;
    color: white; 
    padding: 0.5em 1em;
    border: 0;
    border-radius: 30px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-family: ${css.defaultfont};
    font-size: 14px;
    margin-right: 2%;
    background-image:none;
    width: 200px;
`
const Input = styled.input`
    margin-left: 13%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #24292e;
    height: 37px;
    vertical-align: middle;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: right 8px center;
    border: 1px solid gray;
    border-radius: 6px;
    outline: none;
    box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset;
    :focus{
        border-color: #0366d6;
        outline: none;
        box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
    }
`;

export default NewRide;