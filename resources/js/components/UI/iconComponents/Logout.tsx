import * as React from "react";

function SvgLogout(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M9.377 8.128a.628.628 0 00-.628.628v2.498c0 .347-.281.628-.628.628H6.25V2.498c0-.532-.34-1.013-.85-1.19l-.184-.06h2.911c.347 0 .628.282.628.629v1.877a.628.628 0 101.256 0V1.877A1.88 1.88 0 008.135 0H1.404c-.022 0-.044.007-.067.015C1.307.015 1.278 0 1.25 0 .562 0 0 .562 0 1.249v11.246c0 .532.34 1.012.85 1.19l3.76 1.256a1.252 1.252 0 001.633-1.19v-.628h1.885a1.88 1.88 0 001.877-1.877V8.75a.626.626 0 00-.628-.62z"
                fill="currentColor"
            />
            <path
                d="M14.815 5.808l-2.497-2.497a.627.627 0 00-.68-.133.619.619 0 00-.384.576V5.63H8.756a.628.628 0 100 1.256h2.498v1.877a.624.624 0 001.064.443l2.497-2.497a.647.647 0 000-.902z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgLogout;
