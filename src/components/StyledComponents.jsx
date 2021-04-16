import styled from 'styled-components'

export const CustomButton = styled.a`
    border: 1px solid grey;
    color: grey;
    text-align: center;
    border-radius: 20px;
    width: 100%;
    background-color: white;
    padding: 5px;
    display: block;

    &:hover{
        color: grey;
        text-decoration: none;
    }
    &:focus{
        box-shadow: 0 0 4px 1px #ff007a;
    }
`;
