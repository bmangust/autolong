import * as React from "react";

function SvgPlusGrey(props: React.SVGProps<SVGSVGElement>) {
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
            <path
                d="M15.012 11.452l-3.422.007.008 3.349-1.16.002-.007-3.348-3.422.007-.002-1.086 3.422-.007-.007-3.367 1.16-.002.006 3.367 3.422-.007.002 1.085z"
                fill="#B4B6BD"
            />
        </svg>
    );
}

export default SvgPlusGrey;
