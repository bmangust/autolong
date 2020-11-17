import * as React from "react";

function SvgSearch(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#search_svg__clip0)" fill="#3a3d61">
                <path d="M6.606 0A6.613 6.613 0 000 6.606a6.613 6.613 0 006.606 6.605 6.613 6.613 0 006.605-6.605A6.613 6.613 0 006.606 0zm0 11.992A5.392 5.392 0 011.22 6.606 5.392 5.392 0 016.606 1.22a5.392 5.392 0 015.386 5.386 5.392 5.392 0 01-5.386 5.386z" />
                <path d="M14.821 13.96l-3.496-3.497a.61.61 0 10-.862.862l3.496 3.496a.608.608 0 00.862 0 .61.61 0 000-.862z" />
            </g>
            <defs>
                <clipPath id="search_svg__clip0">
                    <path fill="#fff" d="M0 0h15v15H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default SvgSearch;
