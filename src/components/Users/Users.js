import React, { useState, useEffect } from "react";
import styled from "styled-components";
import User from "../User";

export default function () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((users) => setUsers(users))
            .catch((error) => alert(error.message));
    }, []);

    return (
        <>
            <UsersHeadline>Users</UsersHeadline>
            <Users>
                {users.map((user) => (
                    <User
                        key={user.id}
                        userId={user.id}
                        userName={user.username}
                        website={user.website}
                        companyName={user.company.name}
                    />
                ))}
            </Users>
        </>
    );
}

const UsersHeadline = styled.h1`
    text-align: center;
    margin: 1.5rem auto;
    font-weight: 400;
`;

const Users = styled.div`
    width: 100%;
    @media screen and (min-width: 992px) {
        width: 90%;
    }
    @media screen and (min-width: 1600px) {
        width: 80%;
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
