import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "../Image";

export default function ({ album }) {
    const [coverURL, setCoverURL] = useState("");
    const [photoCount, setPhotoCount] = useState(0);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}`)
            .then((response) => response.json())
            .then((albumPhotos) => {
                setPhotoCount(albumPhotos.length);
                setCoverURL(
                    albumPhotos.length
                        ? albumPhotos[0].thumbnailUrl
                        : `/${noImage}`
                );
            })
            .catch((error) => alert(error.message));
    }, []);

    return (
        <AlbumLink to={`/album/${album.id}`}>
            <AlbumCover src={coverURL} />
            <AlbumTitle>{album.title}</AlbumTitle>
            <AlbumFooter>
                <AlbumPhotosCount>
                    {photoCount} photo
                    {(photoCount > 1 || photoCount == 0) && "s"}
                </AlbumPhotosCount>
            </AlbumFooter>
        </AlbumLink>
    );
}

const AlbumLink = styled(Link)`
    width: 25rem;
    margin: 0 1rem 1.5rem 1rem;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

const AlbumCover = styled(Image)`
    border-radius: 50%;
    margin-bottom: 1.5rem;
    width: 150px;
    height: 150px;
    object-fit: cover;
`;

const AlbumTitle = styled.h2`
    font-weight: 400;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const AlbumFooter = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const AlbumPhotosCount = styled.p`
    color: #545d7a;
    text-align: right;
`;
