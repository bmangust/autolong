import * as React from "react";

function SvgImporters(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.281 5.687c1.135 0 2.055-.94 2.055-2.1 0-1.16-.92-2.1-2.055-2.1-1.135 0-2.054.94-2.054 2.1 0 1.16.92 2.1 2.054 2.1zM4.683 6.066C2.099 6.066 0 8.211 0 10.851h9.372c0-2.64-2.099-4.785-4.69-4.785zM11.282 6.465c-.964 0-1.847.38-2.509.998a6.21 6.21 0 011.293 2.808H15c0-2.106-1.664-3.806-3.718-3.806zM4.683 5.28c1.427 0 2.584-1.181 2.584-2.64C7.267 1.182 6.11 0 4.683 0S2.099 1.182 2.099 2.64c0 1.459 1.157 2.64 2.584 2.64z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgImporters;
