import React from "react";
import Navbar from "./Navbar";
import styled from 'styled-components';
import css from "../default_design";
import { useNavigate } from "react-router-dom";

const Header = () => {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/newride`; 
    navigate(path);
    }
    return (
    <div>
        <Navbar></Navbar>
        <H2>Viajes Disponibles</H2>
        <Div>
            <Button onClick={routeChange}>Crear Viaje</Button>
        </Div>
    </div>
    )
};
const Button = styled.button`
    background-color: ${css.buttoncolor};
    color: ${css.buttontextcolor}; 
    padding: 0.5em 1em;
    border: 0;
    border-radius: 30px;
    margin-left: 3%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-family: ${css.defaultfont};
    font-size: 14px;
    -moz-transition: background-color 0.3s; /* Firefox */
    -webkit-transition: background-color 0.3s; /* Safari and Chrome */
    -o-transition: background-color 0.3s; /* Opera */
    transition: background-color 0.3s;
    :hover {
        background-color: #064D0D;
      }
`

const Div = styled.div `
    display:flex;
    width: 55%;
    justify-content: space-between;
`

const H2 = styled.h2 `
    font-family: ${css.defaultfont};
    text-align: left;
    margin-left: 1%;
    color: ${css.headercolor};
`

export default Header;