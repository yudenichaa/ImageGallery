import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";
import Image from "../Image";

export default function ({ photos, currentPhoto, onClose }) {
    const [currentImageURL, setCurrentImageURL] = useState(
        photos[currentPhoto].url
    );

    const visibleThumbnailsCount = useMedia(
        ["(min-width: 1200px)", "(min-width: 768px)"],
        [4, 3],
        2
    );

    const [thumbnailsWindowNumber, setThumbnailsWindowNumber] = useState(0);
    useEffect(() => {
        setThumbnailsWindowNumber(0);
    }, [visibleThumbnailsCount]);

    const [visibleThumnails, setVisibleThumbnails] = useState(
        photos.slice(0, visibleThumbnailsCount)
    );
    useEffect(() => {
        setVisibleThumbnails(
            photos.slice(
                thumbnailsWindowNumber * visibleThumbnailsCount,
                visibleThumbnailsCount * (thumbnailsWindowNumber + 1)
            )
        );
    }, [thumbnailsWindowNumber, visibleThumbnailsCount]);

    const onArrowLeftClick = () => {
        if (thumbnailsWindowNumber > 0) {
            setThumbnailsWindowNumber(thumbnailsWindowNumber - 1);
        } else {
            setThumbnailsWindowNumber(
                Math.ceil(photos.length / visibleThumbnailsCount) - 1
            );
        }
    };

    const onArrowRightClick = () => {
        if (
            thumbnailsWindowNumber <
            Math.ceil(photos.length / visibleThumbnailsCount) - 1
        ) {
            setThumbnailsWindowNumber(thumbnailsWindowNumber + 1);
        } else {
            setThumbnailsWindowNumber(0);
        }
    };

    const onThumbnailClick = (thumbnailNumber) => {
        const imageIndex =
            thumbnailsWindowNumber * visibleThumbnailsCount + thumbnailNumber;
        setCurrentImageURL(photos[imageIndex].url);
    };

    const handleCloseClick = (event) =>
        event.target == event.currentTarget && onClose();

    return (
        <ModalGallery onClick={handleCloseClick}>
            <ImageContainer onClick={handleCloseClick}>
                <MainImage src={currentImageURL} />
            </ImageContainer>
            <ThumbnailsContainer>
                <ArrowLeft onClick={onArrowLeftClick} src={`/${arrowLeft}`} />
                <Thumbnails>
                    {visibleThumnails.map((thumbnail, thumbnailNumber) => (
                        <Thumbnail
                            key={thumbnail.id}
                            onClick={() => onThumbnailClick(thumbnailNumber)}
                            src={thumbnail.thumbnailUrl}
                        />
                    ))}
                </Thumbnails>
                <ArrowRight
                    onClick={onArrowRightClick}
                    src={`/${arrowRight}`}
                />
            </ThumbnailsContainer>
        </ModalGallery>
    );
}

const ThumbnailsContainerHeight = "150px";

const ModalGallery = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    position: relative;
`;

const MainImage = styled(Image)`
    max-width: 95%;
    max-height: 95%;
    position: absolute;
`;

const ThumbnailsContainer = styled.div`
    height: ${ThumbnailsContainerHeight};
    margin: 0 auto 1.5rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ArrowLeft = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

const ArrowRight = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

const Thumbnails = styled.div`
    display: flex;
`;

const Thumbnail = styled(Image)`
    width: 150px;
    max-width: 50%;
    max-height: ${ThumbnailsContainerHeight};
    object-fit: cover;
    padding: 0.25rem;
`;

function useMedia(queries, values, defaultValue) {
    const [mediaQueryLists] = useState(
        queries.map((q) => window.matchMedia(q))
    );

    const [_, forceUpdate] = useState();
    const updateNeeded = () => forceUpdate({});

    useEffect(() => {
        mediaQueryLists.forEach((mql) => mql.addListener(updateNeeded));
        return () =>
            mediaQueryLists.forEach((mql) => mql.removeListener(updateNeeded));
    }, []);

    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
}
