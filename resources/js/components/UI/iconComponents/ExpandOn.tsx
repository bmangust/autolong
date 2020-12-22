import * as React from "react";

function SvgExpandOn(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx={2.75} cy={2.75} r={1.75} stroke="currentColor" />
            <circle cx={2.75} cy={8.75} r={1.75} stroke="currentColor" />
            <circle cx={2.75} cy={14.75} r={1.75} stroke="currentColor" />
        </svg>
    );
}

export default SvgExpandOn;
