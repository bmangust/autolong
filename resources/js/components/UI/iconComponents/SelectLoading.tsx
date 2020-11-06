import * as React from "react";

function SvgSelectLoading(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            style={{
                margin: "auto",
                background: "#fff",
            }}
            width="1em"
            height="1em"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            display="block"
            {...props}
        >
            <g>
                <path
                    d="M50 15a35 35 0 1024.749 10.251"
                    fill="none"
                    stroke="#eb5e28"
                    strokeWidth={12}
                />
                <path d="M49 3v24l12-12L49 3" fill="#eb5e28" />
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                />
            </g>
        </svg>
    );
}

export default SvgSelectLoading;
