import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Album from "../Album";
import styled from "styled-components";

export default function () {
    const { id } = useParams();
    const [userAlbums, setUserAlbums] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then((resonse) => resonse.json())
            .then((albums) => setUserAlbums(albums))
            .catch((error) => alert(error.message));

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((resonse) => resonse.json())
            .then((user) => setUserName(user.username))
            .catch((error) => alert(error.message));
    }, []);

    return (
        <>
            <AlbumsHeadline>{userName}</AlbumsHeadline>
            <Albums>
                {userAlbums.map((album) => (
                    <Album key={album.id} album={album} />
                ))}
            </Albums>
        </>
    );
}

const AlbumsHeadline = styled.h1`
    text-align: center;
    margin: 1.5rem auto;
    font-weight: 400;
`;

const Albums = styled.div`
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
