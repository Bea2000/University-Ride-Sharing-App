import css from "./default_design";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Button = styled(Link)`
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
`

export default Button;