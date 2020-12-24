import * as React from "react";

function SvgSelectArrow(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M4.816.183l3.75 3.75a.626.626 0 01-.884.884L4.374 1.51 1.067 4.817a.626.626 0 01-.886-.884l3.75-3.75a.626.626 0 01.885 0z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgSelectArrow;
