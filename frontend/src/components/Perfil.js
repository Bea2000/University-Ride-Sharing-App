import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import css from "../default_design";
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
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const images = [image0,image1,image2,image3,image4,image5,image6,image7,image8,image9];
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

    return(
        <div>
        <GlobalStyle whiteColor />
        <Navbar></Navbar>
            <Title> Perfil </Title>
            <DivInfo>
                {!user ? (
                        routeChange("/login")
                    ) : (
                      <FlexBoxHorizontal>
                        <FotoNombre>
                        {console.log(user.img)}
                        <Logo src={images[user.img]} />
                        </FotoNombre>
                        <FlexBoxVertical>
                          <Name>Usuario: @{user.username}</Name>
                          <FlexBoxInfo>
                            <P>Nombre: {user.firstName} {user.lastName}</P>
                            <br></br>
                            <P>Email: {user.email}</P>
                            <br></br>
                          </FlexBoxInfo>
                          <ButtonI to={"../"}>Volver</ButtonI>
                        </FlexBoxVertical>
                      </FlexBoxHorizontal>
                    )}
            </DivInfo>
        </div>
    )
};

const ButtonI = styled(Link)`
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
margin-top: -20px;
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
margin-left: 2%;
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
margin-top: 5%;
margin-bottom: 2%;
`;

const FlexBoxInfo = styled.div`
display: flex;
flex-direction: column;
width: 100%;
margin-top: 5%;
margin-bottom: 15%;
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

export default Perfil;