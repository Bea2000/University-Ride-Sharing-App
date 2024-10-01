import styled from 'styled-components';
import './Navbar.css';
import css from "../default_design";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Navbar = (props) => {
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
                    if(data.error === "No autorizado"){
                      setApiData(false);
                    } else{
                      setApiData(data); 
                    }
                });
        };
        getAPI();
    }, []);
    const [user, setApiData] = useState([]);

    const logout = () => {
        localStorage.removeItem("token");
    }

    return (
        <div className="nav" id="navbar">
        <Div className="nav-header">
            <div className="nav-title" id='title'>
             <H3 onClick={() => routeChange(`../`)}>YO TE LLEVO UC</H3>
            </div>
        </Div>
        {!user ? (
            <div className="nav-links">
                <Link target="_self" to={"/login"}>Iniciar Sesión</Link>
                <Link target="_self" to={"/signup"}>Regístrate</Link>
            </div>
        ) : (
            <div className="nav-links">
                <Link target="_self" to={'/perfil'}>Ver Perfil</Link>
                <Link target="_self" to={'/requests'}>Solicitudes</Link>
                <Link target="_self" to={"/login"} onClick={logout}>Cerrar Sesión</Link>
            </div>
        )}
        </div>
    )
};

const Div = styled.div`
    vertical-align: middle;
`

const H3 = styled.h3`
    font-size: 28px;
    color: ${css.titlecolor};
    font-family: ${css.titlefont};
    margin-left: 30px;
    margin-top: 24px;
`

const Logo = styled.img`
    height: 65px;
    margin-left: 20px;
    margin-top: 7px;
`;

export default Navbar;