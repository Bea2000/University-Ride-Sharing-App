import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'
import Navbar from "./Navbar";
import css from "../default_design";
import { useNavigate } from "react-router-dom";

const Received_Requests = () => {

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
            const API = "http://localhost:4000/requests/received";
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
    
    function acceptRequest(id){
        const API = `http://localhost:4000/requests/update/${id}`;
        const body = {
            "token": localStorage.getItem('token'),
            "accepted": true
        };
        fetch(API,{
            method: 'put',
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
    }
    function rejectRequest(id){
        const API = `http://localhost:4000/requests/update/${id}`;
        const body = {
            "token": localStorage.getItem('token'),
            "accepted": false
        };
        fetch(API,{
            method: 'put',
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
    }

    return (
        <div>
        <GlobalStyle whiteColor />
        <Navbar></Navbar>
        <Title> Solicitudes Recibidas </Title>
        <br></br>
        {apiData.map((request) => (
        <FlexDiv theme={BigBox}>
            <Name>{request.requester}</Name>
            {request.accepted ? (
                    <FlexDiv>
                        <P>Solicitud Aceptada</P>
                        <ButtonS onClick={() => rejectRequest(request.id)}>Rechazar Solicitud</ButtonS>
                    </FlexDiv>
                    ) : (
                    <FlexDiv>
                        <PP>Solicitud Pendiente</PP>
                        <ButtonS onClick={() => acceptRequest(request.id)}>Aceptar Solicitud</ButtonS>
                    </FlexDiv>
                    )}
        <ButtonS onClick={() => routeChange(`/details/${request.ride_id}`,request.ride_id)}>Ver Viaje</ButtonS>
        </FlexDiv>
        ))}
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
`

const ButtonS = styled(Button)`
    text-decoration: none;
    height: 20%;
    margin: auto;
    width: fit-content;
    margin-right: 2%;
`;

const P = styled.p`
    color: #068C14;
    font-weight: bold;
    font-family: ${css.defaultfont};
    margin-right: 3%;
`
const PP = styled.p`
    color: red;
    font-family: ${css.defaultfont};
    font-weight: bold;
    margin-right: 3%;
`

const Div = styled.div`
    background-color: white;
    display: flex;
    flex-direction: ${props => props.theme.dir};
    border-radius: ${props => props.theme.border};
    width: 50%;
    padding: 1%;
    padding-left: ${props => props.theme.padl};
    align-items: ${props => props.theme.aligni};
    justify-content: ${props => props.theme.aligns};
    margin: ${props => props.theme.margin};
    margin-bottom: ${props=> props.theme.margind};
    box-shadow: ${props=> props.theme.boxshadow};
`;

const FlexDiv = styled(Div)`
    flex-direction: row;
    align-items: center;
    margin-left: 28%;
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

export default Received_Requests