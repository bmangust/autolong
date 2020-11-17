import * as React from "react";

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#close_svg__clip0)">
                <path
                    d="M6.275 5.998L11.943.33a.193.193 0 10-.274-.274L6.001 5.725.332.056A.194.194 0 00.06.33l5.668 5.668L.06 11.667a.193.193 0 10.273.274l5.669-5.669 5.668 5.668a.193.193 0 00.274-.273L6.275 5.998z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={0.6}
                />
            </g>
            <defs>
                <clipPath id="close_svg__clip0">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default SvgClose;
