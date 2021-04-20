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

export const CurrencyButton = styled.a`
    border: 0px solid grey;
    color: grey;
    text-align: center;
    border-radius: 20px;
    width: 100%;
    background-color: white;
    display: block;

    &:hover{
        color: grey;
        text-decoration: none;
    }
    &:focus{
        box-shadow: 0 0 4px 1px #ff007a;
    }
`;

export const FeeInput = styled.input`
    border: 1px solid grey;
    color: grey;
    text-align: left;
    border-radius: 20px;
    width: 100%;
    background-color: white;
    padding: 8px;
    display: block;

    &:focus{
        box-shadow: 0 0 4px 1px #ff007a;
        outline: none;
    }
`;

export const SettingsButton = styled.button`
    width: 10%;
    float: right;
    background-color: white;
    border: 0px;

    &:hover{
        color: #ff007a;
    }
`;