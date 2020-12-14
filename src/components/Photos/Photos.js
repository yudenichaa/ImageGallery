import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Photo from "../Photo";
import ModalGallery from "../ModalGallery";

export default function ({ photosPerPage = 16 }) {
    const [albumName, setAlbumName] = useState("");
    const [albumPhotos, setAlbumPhotos] = useState([]);
    const [visiblePhotoCount, setVisiblePhotoCount] = useState(photosPerPage);
    const [modalGallery, setModalGallery] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
            .then((response) => response.json())
            .then((album) => setAlbumName(album.title))
            .catch((error) => alert(error.message));

        fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
            .then((response) => response.json())
            .then((photos) => setAlbumPhotos(photos))
            .catch((error) => alert(error.message));
    }, []);

    const onPhotoClick = (photoIndex) => {
        setModalGallery(
            <ModalGallery
                photos={albumPhotos}
                currentPhoto={photoIndex}
                onClose={() => setModalGallery(null)}
            />
        );
    };

    return (
        <>
            {modalGallery}
            <PhotosHeadline>{albumName}</PhotosHeadline>
            <Photos>
                {albumPhotos
                    .slice(0, visiblePhotoCount)
                    .map((photo, photoIndex) => (
                        <Photo
                            key={photo.id}
                            onClick={() => onPhotoClick(photoIndex)}
                            photo={photo}
                        />
                    ))}
            </Photos>
            <LoadMoreButton
                hidden={visiblePhotoCount >= albumPhotos.length}
                onClick={() =>
                    setVisiblePhotoCount(visiblePhotoCount + photosPerPage)
                }
            >
                Load more
            </LoadMoreButton>
        </>
    );
}

const PhotosHeadline = styled.h1`
    text-align: center;
    margin: 1.5rem auto;
    font-weight: 400;
`;

const LoadMoreButton = styled.button`
    border: none;
    outline: none;
    border-radius: 1.5rem;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 0.7rem 1rem;
    background-color: #00a6f9;
    color: white;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0093d9;
    }
`;

const Photos = styled.div`
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
