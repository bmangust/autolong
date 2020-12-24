import * as React from "react";

function SvgNotyWarning(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx={7.5} cy={7.5} r={7.5} fill="#F2C94C" />
            <path
                d="M6.047 2h2.906L8.47 9.1H6.53L6.047 2zM7.5 13a1.53 1.53 0 01-1.078-.404A1.372 1.372 0 016 11.586c0-.393.14-.72.422-.979.281-.269.64-.404 1.078-.404.438 0 .797.135 1.078.404.281.26.422.586.422.98 0 .393-.146.73-.438 1.009-.28.27-.635.404-1.062.404z"
                fill="#fff"
            />
        </svg>
    );
}

export default SvgNotyWarning;
