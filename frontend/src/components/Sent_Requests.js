import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import Navbar from "./Navbar";
import css from "../default_design";
import { useNavigate } from "react-router-dom";

const Sent_Requests = () => {

  let navigate = useNavigate(); 
  const routeChange = (route, id) =>{ 
  let path = route; 
  navigate(path, {
      state: {
          id: id,
      }
  });
  }

    useEffect(() => {
        const getAPI = () => {
            const API = "http://localhost:4000/requests/sent";
            const body = {
                "token": localStorage.getItem('token'),
            };
            fetch(API,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              })
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState([]);

    return (
        <div>
        <GlobalStyle whiteColor />
        <Navbar></Navbar>
        <Title> Solicitudes Enviadas </Title>
        <br></br>
        {apiData.map((request) => (
        <Div theme={BigBox}>
            <DivName>
                <Name>@{request.ride_driver}</Name>
            </DivName>
            {request.accepted ? (
                        <FlexDiv>
                            <ButtonS onClick={() => routeChange(`/new_rating/${request.ride_driver}`, request.ride_driver)}>Enviar critica</ButtonS> 
                            <ButtonS onClick={() => routeChange(`/chat/${request.ride_id}`,request.ride_id)}>Chat</ButtonS>
                            <ButtonS onClick={() => routeChange(`/details/${request.ride_id}`, request.ride_id)}>Ver Viaje</ButtonS>
                            <P>Solicitud Aceptada</P>
                        </FlexDiv>
                    ) : (
                        <FlexDiv>
                            <PP>Aceptación Pendiente</PP>
                            <ButtonS onClick={() => routeChange(`/details/${request.ride_id}`, request.ride_id)}>Ver Viaje</ButtonS>
                        </FlexDiv>
                    )}
        </Div>
        ))}
        <br></br>
        <Button onClick={() => routeChange('/requests')}>Volver</Button>
        </div>
    );
};

const Name = styled.h4`
    color: black;
    font-size: 24px;
    font-family: ${css.defaultfont};
    margin-left: 10%;
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
    margin-left: 4%;
    :hover {
        background-color: #064D0D;
      }
`

const ButtonS = styled.button`
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
    text-decoration: none;
    height: 20%;
    margin-right: 2%;
    width: fit-content;
    :hover {
        background-color: #064D0D;
      }
`;

const P = styled.p`
    color: #068C14;
    font-weight: bold;
    font-family: ${css.defaultfont};
    overflow: hidden;
    white-space: nowrap;

`
const PP = styled.p`
    color: red;
    font-family: ${css.defaultfont};
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 2%;
`

const Div = styled.div`
    background-color: white;
    display: flex;
    flex-direction: row;
    border-radius: ${props => props.theme.border};
    width: 60%;
    padding: 1%;
    align-items: ${props => props.theme.aligni};
    justify-content: ${props => props.theme.aligns};
    margin: ${props => props.theme.margin};
    margin-bottom: ${props=> props.theme.margind};
    box-shadow: ${props=> props.theme.boxshadow};
`;

const FlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: auto;
    width: 100%;
    align-items: center;
`
const DivName = styled.div`
    width: 30%;
    text-align: center;
    vertical-align: middle;
    line-height: 100%;  
`

const BigBox = {
    boxshadow: "6px 2px 16px 0px rgba(0, 0, 0, 0.48) , -6px -2px 16px 0px rgba(255, 255, 255, 0.4)",
    border: "1%",
    dir: "row",
    padl: "0px",
    aligni: "flex-start",
    aligns: "center",
    margin: "auto",
    margind: "10px",
};

const Title = styled.h2`
  text-align: center;
  font-family: ${css.defaultfont};
  text-align: left;
  margin-left: 1%;
  color: ${css.headercolor};
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.whiteColor ? '${css.bodycolor}' : 'black')};
  }
`

export default Sent_Requests