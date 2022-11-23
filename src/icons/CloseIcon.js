import React from "react";

function CloseIcon(props) {
    const {onClick = () => null} = props

    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            stroke="#753fd9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className="icon icon-tabler icon-tabler-square-x cursor"
            viewBox="0 0 24 24"
        >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <rect width="16" height="16" x="4" y="4" rx="2"></rect>
            <path d="M10 10l4 4m0-4l-4 4"></path>
        </svg>
    );
}

export default CloseIcon;
