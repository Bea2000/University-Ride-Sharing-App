import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import css from "../default_design";

const Requests = () => {
    let navigate = useNavigate(); 
    const routeChange = (route) =>{ 
    let path = route; 
    navigate(path);
    }
    useEffect(() => {
      const getAPI = () => {
          const API = "http://localhost:4000/users/profile";
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
                  console.log(response.status);
                  return response.json();
              })
              .then((data) => {
                  console.log(data.error);
                  if(data.error == "No autorizado"){
                    setApiData(false);
                  } else{
                    setApiData(data); 
                  }
              });
      };
      getAPI();
  }, []);
  const [user, setApiData] = useState([]);

    return (
        <div>
        <GlobalStyle whiteColor />
        <Navbar></Navbar>
        <Title> Solicitudes </Title>
        <br></br>
        <br></br>
        {!user ? (
          routeChange("/login")
        ) : (
          <div>
              <Button onClick={() => routeChange("/requests_sent")}>Solicitudes Enviadas</Button>
              <Button onClick={() => routeChange("/requests_received")}>Solicitudes Recibidas</Button>
          </div>
        )}
        </div>
    );
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

const Button = styled.button`
  background-color: ${css.buttoncolor};
  color: ${css.buttontextcolor}; 
  padding: 0.5em 3em;
  border: 0;
  border-radius: 30px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  font-family: ${css.defaultfont};
  font-size: 25px;
  text-decoration: none;
  width: 40%;
  margin-top: 10px;
  margin-left: 5%;
  margin-right: 2%;
`

export default Requests