import * as React from "react";

function SvgPlus(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M23 11.5C23 17.851 17.851 23 11.5 23S0 17.851 0 11.5 5.149 0 11.5 0 23 5.149 23 11.5z"
                fill="#f44a0e"
            />
            <path
                d="M15.85 12.6h-3.185v3.15h-1.926V12.6H7.553v-1.8h3.186V7.65h1.926v3.15h3.186v1.8z"
                fill="#fff"
            />
        </svg>
    );
}

export default SvgPlus;
