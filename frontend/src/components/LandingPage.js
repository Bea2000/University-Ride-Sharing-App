import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
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

const LandingPage = () => {
    const images = [image0,image1,image2,image3,image4,image5,image6,image7,image8,image9];
    
    let navigate = useNavigate(); 
    const effectRan = React.useRef(false);
    const routeChange = (route, id) =>{ 
        let path = route; 
        navigate(path, {
            state: {
                id: id,
            }
        });
    }
    
    useEffect(() => {
        if(!effectRan.current){
            const getAPI = () => {
                const API = "http://localhost:4000/rides";
                
                fetch(API)
                .then((response) => {
                    // console.log(response);
                    return response.json();
                })
                .then((data) => {
                            setApiData(data);
                            console.log("data",data);
                            data.map((ride)=>(
                                console.log("buscando",ride.id),
                                findRequest(ride.id)
                            ));
                        });
            };
            getAPI();
            const getUser = () => {
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
                        // console.log(response);
                        return response.json();
                    })
                    .then((data) => {
                        // console.log(data);
                        setUsername(data.username);
                    });
            };
            getUser();
            const findRequest = (id) => {
                const API = `http://localhost:4000/requests/find`;
                fetch(API, {
                    headers: {'Content-Type': 'application/json'},
                    method: "post",
                    body: JSON.stringify({
                        "token": localStorage.getItem("token"),
                        "id": id
                    }),
                })
                    .then(response => {
                        if(response.status == 200){
                            // console.log("Funciona!")
                        }
                        // console.log(response);
                        return response.json();
                    })
                    .then((data)=>{
                        console.log("el data:",data);
                        setFind(prev => [...prev,data]);
                    });
            }
            return () => {
                effectRan.current = true;
            };
        }
    }, []);
    
    
    const [apiData, setApiData] = useState([]);
    const [username, setUsername] = useState([]);
    const [Find, setFind] = useState([]);
    console.log("Find:",Find);
    
    function deleteRide(id) {
        const API = `http://localhost:4000/rides/delete/${id}`;
        fetch(API, {
            headers: {'Content-Type': 'application/json'},
            method: "delete",
            body: JSON.stringify({
                "token": localStorage.getItem("token"),
                "id": id
            }),
        })
            .then(response => {
                if(response.status == 200){
                    setApiData(apiData.filter(item => item.id !== id));
                }
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                // console.log(data);
            });
    };

    function deleteRequest(id, ride_id) {
        const API = `http://localhost:4000/requests/delete/${id}`;
        fetch(API, {
            headers: {'Content-Type': 'application/json'},
            method: "delete",
            body: JSON.stringify({
                "token": localStorage.getItem("token"),
                "id": id
            }),
        })
            .then(response => {
                if(response.status == 200){
                    console.log("Se elimino request!")
                    setFind(Find.filter(item => item.id !== id));
                    setFind(prev => [...prev,{
                        id: 0,
                        ride_id: ride_id,
                        find: false
                    }]);
                }
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                // console.log(data);
            });
    };

    function sendRequest(event, id) {
        event.preventDefault();
        // console.log(id);
        const API = `http://localhost:4000/requests/new-request`;
        fetch(API, {
            headers: {'Content-Type': 'application/json'},
            method: "post",
            body: JSON.stringify({
                "token": localStorage.getItem("token"),
                "ride": id
            }),
        })
            .then(response => {
                if(response.status == 200){
                    console.log("Solicitud creada!");
                }
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data.id);
                setFind(Find.filter(item => item.ride_id !== id));
                setFind(prev => [...prev,{
                    id: data.id,
                    ride_id: id,
                    find: true
                }]);
                
            });
    };

    return(
        <div>
        <Header></Header>
            {!username?(
                routeChange('/login')
            ):(
                <div>
                <GlobalStyle whiteColor />
                <br></br>
                    {apiData.map((ride) => (
                    <div>
                        <DivBig>
                            <DivHorizontal>
                                <DivLogo>
                                    <Logo src={images[ride.img]} />
                                    <br></br>
                                    <Name>{ride.driver}</Name>
                                </DivLogo>
                                <DivContent key={ride.id}>
                                    {ride.direccion ? (
                                        <P>Hasta {ride.campus}</P>
                                    ) : (
                                        <P>Desde {ride.campus}</P>
                                    )}
                                    <P>Comuna: {ride.comuna}</P>
                                    <P>Precio: ${ride.precio}</P>
                                </DivContent>
                            </DivHorizontal>
                                {(() => {
                                    if (username == ride.driver) {
                                    return (
                                        <ButtonDiv>
                                            <ButtonS onClick={() => routeChange(`/details/${ride.id}`,ride.id)}>Ver Detalle</ButtonS>
                                            <ButtonS onClick={() => routeChange(`editride/${ride.id}`,ride.id)}>Editar</ButtonS>
                                            <ButtonS onClick={() => deleteRide(ride.id)}>Borrar</ButtonS>
                                            <ButtonS onClick={() => routeChange(`/chat/${ride.id}`,ride.id)}>Chat</ButtonS>
                                        </ButtonDiv>
                                    )
                                    } else {
                                    return (
                                        <ButtonDiv>
                                            {Find.map((f)=> (
                                                (() => {
                                                    if (f.ride_id == ride.id && f.find == true) {
                                                        console.log(f)
                                                    return (
                                                        <ButtonDiv2>
                                                            <ButtonSblack onClick={() => routeChange("/requests_sent")}>Ver Solicitud</ButtonSblack>
                                                            <bh></bh>
                                                            <ButtonS2 onClick={() => deleteRequest(f.id, ride.id)}>Eliminar Solicitud</ButtonS2>
                                                            <bh></bh>
                                                            <ButtonS2 onClick={() => routeChange(`/details/${ride.id}`,ride.id)}>Ver Detalle</ButtonS2>
                                                        </ButtonDiv2>
                                                    )
                                                    } else if (f.ride_id == ride.id && f.find == false) {
                                                    return (
                                                        <ButtonDiv2>
                                                            <ButtonS2 onClick={(e) => sendRequest(e, ride.id)}>Enviar Solicitud</ButtonS2>
                                                            <bh></bh>
                                                            <ButtonS2 onClick={() => routeChange(`/details/${ride.id}`,ride.id)}>Ver Detalle</ButtonS2>
                                                        </ButtonDiv2>
                                                    )
                                                    }
                                                })()
                                            ))}
                                        </ButtonDiv>
                                    )
                                    }
                                })()}
                        </DivBig>
                        <br></br>
                    </div>
                    ))}
            </div>
            )}
        </div>
    )
};

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
    
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.whiteColor ? '${css.bodycolor}' : 'black')};
  }
`

const Name = styled.h4`
    color: black;
    font-family: ${css.defaultfont};
    margin: auto;
`

const P = styled.p`
    margin: 0.2%;
    color: black;
    font-family: ${css.defaultfont};
`

const Logo = styled.img`
    margin-top: 10%;
    height: 80%;
    object-fit: contain;
`;

const DivContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 40%;
`;

const DivLogo = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40%;
`;

const DivBig = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 1%;
    width: 600px;
    height: 250px;
    padding: 1%;
    align-items: flex-start;
    justify-content: center;
    margin: auto;
    box-shadow: 6px 2px 16px 0px rgba(0, 0, 0, 0.48) , -6px -2px 16px 0px rgba(255, 255, 255, 0.8);
`;

const DivHorizontal = styled.div`
    display: flex;
    flex-direction: row;
    height: 80%;
    width: 100%;
`;

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    height: 15%;
    width: 100%;
    justify-content: flex-end;
`

const ButtonDiv2 = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
`

const ButtonS = styled.button`
    width: fit-content;
    background-color: ${css.buttoncolor};
    color: ${css.buttontextcolor}; 
    padding: 10px;
    border: 0;
    margin-right: 1%;
    border-radius: 30px;
    text-align: center;
    vertical-align:middle
    white-space: nowrap;
    cursor: pointer;
    font-family: ${css.defaultfont};
    font-size: 14px;
    -moz-transition: background-color 0.3s; /* Firefox */
    -webkit-transition: background-color 0.3s; /* Safari and Chrome */
    -o-transition: background-color 0.3s; /* Opera */
    transition: background-color 0.3s;
    text-decoration: none;
    :hover {
        background-color: #064D0D;
      }
`;

const ButtonS2 = styled.button`
    width: fit-content;
    background-color: ${css.buttoncolor};
    color: ${css.buttontextcolor}; 
    padding: 10px;
    border: 0;
    margin-right: 1%;
    border-radius: 30px;
    text-align: center;
    vertical-align:middle
    white-space: nowrap;
    cursor: pointer;
    font-family: ${css.defaultfont};
    font-size: 14px;
    -moz-transition: background-color 0.3s; /* Firefox */
    -webkit-transition: background-color 0.3s; /* Safari and Chrome */
    -o-transition: background-color 0.3s; /* Opera */
    transition: background-color 0.3s;
    text-decoration: none;
    :hover {
        background-color: #064D0D;
      }
`;

const ButtonSblack = styled(ButtonS2)`
    background-color: #064D0D;
    :hover {
        background-color: black;
    }
`

const HeaderH2 = styled.h2 `
    font-family: ${css.defaultfont};
    text-align: left;
    margin-left: 1%;
    color: ${css.headercolor};
`

export default LandingPage;