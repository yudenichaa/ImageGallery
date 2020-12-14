import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Image from "../Image";

export default function ({ userId, userName, website, companyName }) {
    return (
        <UserLink to={`user/${userId}`}>
            <UserAvatar
                src={`http://picsum.photos/100/${100 + userId}`}
                alt="avatar"
            />
            <UserInfo>
                <UserName>{userName}</UserName>
                <UserWebsite>{website}</UserWebsite>
                <CompanyName>{companyName}</CompanyName>
            </UserInfo>
        </UserLink>
    );
}

const UserLink = styled(Link)`
    width: 25rem;
    margin: 0 1rem 1.5rem 1rem;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 3rem 2rem;
    display: flex;
    align-items: center;
    transition: box-shadow 0.3s;
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

const UserInfo = styled.div``;

const UserAvatar = styled(Image)`
    border-radius: 50%;
    margin-right: 2rem;
    width: 100px;
    height: 100px;
    object-fit: cover;
`;

const UserName = styled.h2`
    font-weight: 300;
    margin-bottom: 1rem;
`;

const UserWebsite = styled.p`
    margin-bottom: 0.5rem;
`;

const CompanyName = styled.p`
    color: #545d7a;
`;
