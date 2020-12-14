import React from "react";
import styled from "styled-components";
import Image from "../Image";

export default function ({ photo, onClick }) {
    return (
        <PhotoContainer onClick={onClick}>
            <PhotoThumbnail src={photo.thumbnailUrl} />
        </PhotoContainer>
    );
}

const PhotoContainer = styled.div`
    width: 150px;
    height: 150px;
    margin: 0 1rem 1.5rem 1rem;
    background-color: #ffffff;
    border-radius: 1.5rem;
    overflow: hidden;
`;

const PhotoThumbnail = styled(Image)`
    object-fit: cover;
`;
