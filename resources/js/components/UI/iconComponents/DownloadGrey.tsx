import * as React from "react";

function SvgDownloadGrey(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx={11} cy={11} r={11} fill="#F7F8FA" />
            <g clipPath="url(#download-grey_svg__clip0)">
                <path
                    d="M14.004 11.44L11 14.443 7.996 11.44l.553-.553 2.06 2.06V6h.782v6.948l2.06-2.061.553.553zM16 15.219H6V16h10v-.781z"
                    fill="#B4B6BD"
                />
            </g>
            <defs>
                <clipPath id="download-grey_svg__clip0">
                    <path
                        fill="#fff"
                        transform="translate(6 6)"
                        d="M0 0h10v10H0z"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}

export default SvgDownloadGrey;
