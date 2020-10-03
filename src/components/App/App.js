import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Users from "../Users";
import Albums from "../Albums";
import Photos from "../Photos";

export default function () {
    return (
        <App>
            <Switch>
                <Route exact path="/" children={<Users />} />
                <Route path="/user/:id" component={Albums} />
                <Route path="/album/:id" component={Photos} />
            </Switch>
        </App>
    );
}

const App = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f8fc;
    min-height: 100vh;
`;
