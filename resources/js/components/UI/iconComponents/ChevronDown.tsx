import * as React from "react";

function SvgChevronDown(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3.933 4.817l-3.75-3.75a.626.626 0 01.884-.884L4.375 3.49 7.683.183a.626.626 0 01.885.884l-3.75 3.75a.626.626 0 01-.885 0z"
                fill="#949599"
            />
        </svg>
    );
}

export default SvgChevronDown;
