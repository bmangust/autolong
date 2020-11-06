import * as React from "react";

function SvgDownload(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <path
                d="M13.828 9.17v4.072a.587.587 0 01-.586.586H1.758a.587.587 0 01-.586-.586V9.17H0v4.072C0 14.212.789 15 1.758 15h11.484A1.76 1.76 0 0015 13.242V9.17h-1.172z"
                fill="#EB5E28"
            />
            <path
                d="M10.313 6.906L8.085 9.132V0H6.914v9.132L4.688 6.906l-.83.828L7.5 11.376l3.641-3.642-.829-.828z"
                fill="#EB5E28"
            />
        </svg>
    );
}

export default SvgDownload;
