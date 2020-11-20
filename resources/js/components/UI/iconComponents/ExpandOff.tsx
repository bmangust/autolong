import * as React from "react";

function SvgExpandOff(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 4 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx={1.75} cy={1.75} r={1.75} fill="currentColor" />
            <circle cx={1.75} cy={7.75} r={1.75} fill="currentColor" />
            <circle cx={1.75} cy={13.75} r={1.75} fill="currentColor" />
        </svg>
    );
}

export default SvgExpandOff;
