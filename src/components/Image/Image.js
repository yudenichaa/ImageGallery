import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import spinner from "./assets/spinner.svg";
import noImage from "./assets/noimage.png";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export default function ({ src, ...restProps }) {
    const [imageURL, setImageURL] = useState("");
    const [imageAnimation, setImageAnimation] = useState("none");

    useEffect(() => {
        let isMounted = true;
        setImageAnimation(css`none`);
        setImageURL(`/${spinner}`);
        if (src) {
            let preloadImg = document.createElement("img");
            preloadImg.src = src;
            preloadImg.onload = () => {
                if (isMounted) {
                    setImageURL(src);
                    setImageAnimation(
                        css`
                            ${fadeIn}
                        `
                    );
                }
            };
            preloadImg.onerror = () => {
                if (isMounted) {
                    setImageURL(`/${noImage}`);
                    setImageAnimation(
                        css`
                            ${fadeIn}
                        `
                    );
                }
            };
        }
        return () => {
            isMounted = false;
        };
    }, [src]);

    return <Image animation={imageAnimation} src={imageURL} {...restProps} />;
}

const Image = styled.img`
    transition: opacity 0.3s;
    animation: ${(props) => props.animation};
    animation-duration: 0.7s;
`;
