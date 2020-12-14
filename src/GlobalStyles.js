import { createGlobalStyle } from "styled-components";
import "./fonts/fonts.css";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        line-height: 1;
        font-family: 'Roboto', sans-serif;
    }

    img {
        display: block;
    }

    a {
        text-decoration: none;
        color: #000000;
    }
`;
