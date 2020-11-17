import * as React from "react";

function SvgArrow(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M9.814.186A.6.6 0 009.374 0H.626a.6.6 0 00-.44.186.601.601 0 00-.185.44.6.6 0 00.186.439L4.56 5.438c.124.124.27.186.44.186a.6.6 0 00.44-.186l4.374-4.375A.601.601 0 0010 .625a.602.602 0 00-.186-.44z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgArrow;
