import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import Navbar from "./Navbar";
import css from "../default_design";
import { useNavigate } from "react-router-dom";
import image0 from "../images/0.png"
import image1 from "../images/1.png"
import image2 from "../images/2.png"
import image3 from "../images/3.png"
import image4 from "../images/4.png"
import image5 from "../images/5.png"
import image6 from "../images/6.png"
import image7 from "../images/7.png"
import image8 from "../images/8.png"
import image9 from "../images/9.png"

const Details = () => {
  const images = [image0,image1,image2,image3,image4,image5,image6,image7,image8,image9];
  const navigate = useNavigate();
  useEffect(() => {
    const getAPI = () => {
        const API = `http://localhost:4000/rides/${id}`;

        fetch(API)
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
const [ride, setApiData] = useState([]);

    const { id } = useParams();
    return (
        <div>
        <GlobalStyle whiteColor />
        <Navbar></Navbar>
            <Title> Detalle Viaje </Title>
            <DivInfo>
                <FlexBoxHorizontal>
                    <FotoNombre>
                          <Logo src={images[ride.img]} />
                    </FotoNombre>
                    <FlexBoxVertical>
                        <Name>@{ride.driver}</Name>
                        <FlexBoxInfo>
                        {ride.direccion ? (
                                    <P>Hasta {ride.campus}</P>
                                ) : (
                                    <P>Desde {ride.campus}</P>
                                )}
                          <br></br>
                          <P>Rating: {ride.rating}</P>
                          <br></br>
                          <P>Comuna: {ride.comuna}</P>
                          <br></br>
                          <P>Precio: ${ride.precio}</P>
                          <br></br>
                          <P>Modelo del auto: {ride.modelo}</P>
                          <br></br>
                          <P>Patente {ride.patente}</P>
                          <br></br>
                        </FlexBoxInfo>
                        <ButtonI onClick={() => navigate(-1)}>Volver</ButtonI>
                    </FlexBoxVertical>
                </FlexBoxHorizontal>
            </DivInfo>
        </div>
    );
};

const ButtonI = styled.button`
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
  width: 20%;
  margin-top: -70px;
  margin-left: auto;
  margin-right: 2%;
`

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.whiteColor ? '${css.bodycolor}' : 'black')};
  }
`

const Name = styled.h4`
    color: black;
    font-family: ${css.defaultfont};
    font-size: 24px;
    text-align: center;
    margin-bottom: auto;
`

const P = styled.p`
    margin: 0.2%;
    color: black;
    font-family: ${css.defaultfont};
`

const DivInfo = styled.div`
  margin:8%;
  background-color: white;
  border-radius: 1%;
  width: 75%;
  height: 450px;
  margin: auto;
  box-shadow: 6px 2px 16px 0px rgba(0, 0, 0, 0.48) , -6px -2px 16px 0px rgba(255, 255, 255, 0.8);

`;

const Title = styled.h2`
  text-align: center;
  font-family: ${css.defaultfont};
  text-align: left;
  margin-left: 1%;
  color: ${css.headercolor};
`;

const FotoNombre = styled.div`
  margin: 5%;
  margin: auto;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const FlexBoxHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
  height: 100%;

`;

const FlexBoxVertical = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1%;
  margin-bottom: 2%;
`;

const FlexBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 10%;
  margin-left: 20%;
`;


const Logo = styled.img`
    border-radius: 1000px;
    height: 100%;
    max-width: 100%;
    object-fit: contain;
    margin: auto;
    margin-bottom: 15px;
`;

export default Details