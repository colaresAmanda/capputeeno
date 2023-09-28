import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { SearchIcon } from "./search-icon";

export const PrimaryInput = styled.input`
width: 352px;

border: none;
padding: 9px 16px;
border-radius: 8px;

font-family: inherit;
font-size: 14px;
font-weight: 400;
line-height: 22px;
color: var(--text-dark);

background-color: var(--bg-secondary);
`

const InpuContainer = styled.div`
position: relative;
width: 352px;

svg{
    position: absolute;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
}
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}
export function PrimaryInputWSearchIcon(props: InputProps){
    return (
        <InpuContainer>
            <PrimaryInput {...props}/>
            <SearchIcon />
        </InpuContainer>
    )
}