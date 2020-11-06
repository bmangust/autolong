import * as React from "react";

function SvgNotyError(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <circle cx={7.5} cy={7.5} r={7.5} fill="#EB5757" />
            <path
                d="M7.66 7.5l3.307-3.307a.113.113 0 00-.16-.16L7.501 7.34 4.194 4.033a.113.113 0 00-.16.16l3.307 3.306-3.307 3.307a.113.113 0 10.16.16l3.307-3.307 3.306 3.307a.113.113 0 00.16-.16L7.66 7.499z"
                fill="#F2F2F2"
                stroke="#fff"
                strokeWidth={0.7}
            />
        </svg>
    );
}

export default SvgNotyError;
