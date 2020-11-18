import * as React from "react";

function SvgPrices(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0 9.107a.6.6 0 01.6-.6h1.787a.6.6 0 01.6.6v3.268a.6.6 0 01-.6.6H.6a.6.6 0 01-.6-.6V9.107zM4.016 2.586a.6.6 0 01.6-.6h1.786a.6.6 0 01.6.6v9.79a.6.6 0 01-.6.6H4.616a.6.6 0 01-.6-.6v-9.79zM8.03 5.697a.6.6 0 01.6-.6h1.787a.6.6 0 01.6.6v6.678a.6.6 0 01-.6.6H8.63a.6.6 0 01-.6-.6V5.697zM12.014.6a.6.6 0 01.6-.6H14.4a.6.6 0 01.6.6v11.775a.6.6 0 01-.6.6h-1.786a.6.6 0 01-.6-.6V.6z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgPrices;
