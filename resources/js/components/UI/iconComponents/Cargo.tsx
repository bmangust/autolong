import * as React from "react";

function SvgCargo(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3.088 8.571a.409.409 0 01-.312-.15L.13 5.335a.577.577 0 010-.728c.173-.2.452-.2.624 0L3.09 7.33 9.247.15c.172-.2.451-.2.624 0 .172.202.172.527 0 .728L3.4 8.421c-.087.1-.2.15-.313.15z"
                fill="#EB5E28"
            />
        </svg>
    );
}

export default SvgCargo;
