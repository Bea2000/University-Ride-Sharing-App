import React from "react";
import styled from 'styled-components';
import css from "../default_design";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'

const NewChat = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `../`;
        navigate(path);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        // Agregamos token al body de la request
        const token = localStorage.getItem('token');
        const body = {
			"token": token
        };
    
            console.log(body);
            const response = await fetch("http://localhost:4000/chats/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            console.log(response);
      }

      return (
        <div>
            <GlobalStyle whiteColor />
            <Navbar></Navbar>
            <Div>
                <Header>
                    <H3>CREAR CHAT</H3>
                </Header>
                <Content>
                <Form onSubmit={handleFormSubmit}>
                <ButtonDiv>
                    <Button type="submit">Crear Chat</Button>
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
        box-shadow:0px 0px 0px 2px #8B728e inset;
        width: 30%;
        height: 50%;
        row-gap: 20px;
        border: 3px solid #8B728e;
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
        background-color: #8B728e;
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
        background: white;
        border-radius: 10px;
        text-align: center;
        font-family: ${css.defaultfont};
    `
    const Select = styled.select`
        margin-left: 25%;
        background: #92BFB1;
        color: #394648; 
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
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        outline: none;
        box-shadow: rgba(225, 228, 232, 0.2) 0px 1px 0px 0px inset;
        :focus{
            border-color: #0366d6;
            outline: none;
            box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
        }
    `;
    
    export default NewChat;