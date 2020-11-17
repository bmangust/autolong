import * as React from "react";

function SvgCheck(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#check_svg__clip0)" fill="currentColor">
                <path d="M7.333 15.323C3.29 15.323 0 12.033 0 7.99S3.29.657 7.333.657c1.406 0 2.774.4 3.956 1.16a.5.5 0 01-.54.842 6.305 6.305 0 00-3.416-1.002A6.34 6.34 0 001 7.99a6.34 6.34 0 006.333 6.333 6.34 6.34 0 006.304-6.951.5.5 0 11.995-.097c.023.235.034.474.034.715 0 4.044-3.29 7.333-7.333 7.333z" />
                <path d="M8.167 9.656a.496.496 0 01-.354-.146l-3-3a.5.5 0 01.708-.708L8.167 8.45l6.98-6.98a.5.5 0 01.707.708L8.52 9.51a.5.5 0 01-.354.146z" />
            </g>
            <defs>
                <clipPath id="check_svg__clip0">
                    <path fill="#fff" d="M0 0h16v16H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default SvgCheck;
