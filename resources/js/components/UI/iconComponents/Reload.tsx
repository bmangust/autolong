import * as React from "react";

function SvgReload(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.519.667C4.946.667 2.04 3.575 2.04 7.148v.021L.757 5.238a.414.414 0 00-.689.456L1.93 8.495a.414.414 0 00.621.077l2.587-2.33a.415.415 0 00.031-.585.415.415 0 00-.585-.03L2.867 7.178v-.031a5.658 5.658 0 015.652-5.655 5.661 5.661 0 015.654 5.655 5.658 5.658 0 01-5.651 5.655c-1.51 0-2.93-.588-3.996-1.657a.412.412 0 00-.585 0 .412.412 0 000 .585 6.433 6.433 0 004.58 1.899A6.487 6.487 0 0015 7.147 6.488 6.488 0 008.519.667z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgReload;
