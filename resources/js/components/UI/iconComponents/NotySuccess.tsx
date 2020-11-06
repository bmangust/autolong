import * as React from "react";

function SvgNotySuccess(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <circle cx={7.5} cy={7.5} r={7.5} fill="#219653" />
            <path
                d="M6.47 9.83L4.68 7.698a.426.426 0 00-.327-.158.426.426 0 00-.326.158.578.578 0 000 .723h0l2.117 2.52s0 0 0 0a.424.424 0 00.326.159c.122 0 .24-.056.327-.158h0l5.176-6.16a.578.578 0 000-.723.426.426 0 00-.326-.159.426.426 0 00-.326.159h0L6.47 9.83z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={0.2}
            />
        </svg>
    );
}

export default SvgNotySuccess;
