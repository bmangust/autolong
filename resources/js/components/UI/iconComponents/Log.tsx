import * as React from "react";

function SvgLog(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M2.107 2.947h11.286v-.094a.707.707 0 00-.706-.706H7.08c-.46 0-.893-.24-1.133-.627L5.24.387A.799.799 0 004.553 0H.487A.49.49 0 000 .493V8.36l.76-4.3a1.348 1.348 0 011.347-1.113z"
                fill="currentColor"
            />
            <path
                d="M14.813 3.78a.833.833 0 00-.646-.293H2.1a.818.818 0 00-.82.666L.013 11.38c-.006.047-.013.093-.013.14v.093c0 .394.32.707.707.707h12.186c.4.007.747-.273.82-.667l1.274-7.233a.774.774 0 00-.174-.64z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgLog;
