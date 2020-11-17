import * as React from "react";

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M15.53 3.765H.47a.47.47 0 010-.941h15.06a.47.47 0 010 .94z"
                fill="currentColor"
            />
            <path
                d="M15.862 3.625L13.038 6.45a.47.47 0 01-.665-.665l2.49-2.49-2.49-2.491a.47.47 0 01.665-.667l2.824 2.824a.471.471 0 010 .665z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgArrowRight;
