import * as React from "react";

function SvgBackup(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M3 11h12v1H3v-1z" fill="currentColor" />
            <path
                d="M15.42 6.685A.97.97 0 0014.465 6h-1.19a1.5 1.5 0 01-.07 1h1.27C15 8.47 15.86 10.825 16 11.24V15H2v-3.76C2.14 10.825 3.525 7 3.525 7H4.79a1.5 1.5 0 01-.07-1H3.535a.96.96 0 00-.95.66C1 11 1 11.05 1 11.165V15a1 1 0 001 1h14a1 1 0 001-1v-3.835c0-.115 0-.165-1.58-4.48z"
                fill="currentColor"
            />
            <path
                d="M9 9.92l3.19-3.175a.5.5 0 10-.69-.705L9.5 8V2a.5.5 0 10-1 0v6l-2-1.975a.5.5 0 10-.705.71L9 9.92z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgBackup;
