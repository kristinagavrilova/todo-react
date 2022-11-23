import React from "react";

function FilesIcon(props) {
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
            className="icon icon-tabler icon-tabler-files cursor"
            viewBox="0 0 24 24"
        >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M15 3v4a1 1 0 001 1h4"></path>
            <path d="M18 17h-7a2 2 0 01-2-2V5a2 2 0 012-2h4l5 5v7a2 2 0 01-2 2z"></path>
            <path d="M16 17v2a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2"></path>
        </svg>
    );
}

export default FilesIcon;
