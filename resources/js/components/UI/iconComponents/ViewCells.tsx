import * as React from "react";

function SvgViewCells(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#view-cells_svg__clip0)" fill="#B4B6BD">
                <path d="M17.917 19.167H2.083A2.086 2.086 0 010 17.083V2.917C0 1.768.935.833 2.083.833h15.834C19.065.833 20 1.768 20 2.917v14.166a2.086 2.086 0 01-2.083 2.084zM2.083 1.667c-.689 0-1.25.56-1.25 1.25v14.166c0 .69.561 1.25 1.25 1.25h15.834c.689 0 1.25-.56 1.25-1.25V2.917c0-.69-.561-1.25-1.25-1.25H2.083z" />
                <path d="M19.583 6.667H.417a.417.417 0 010-.834h19.166a.417.417 0 010 .834zM19.583 10.833H.417a.417.417 0 010-.833h19.166a.417.417 0 010 .833zM19.583 15H.417a.417.417 0 010-.833h19.166a.417.417 0 010 .833z" />
                <path d="M5.417 19.167A.417.417 0 015 18.75V6.25a.417.417 0 01.833 0v12.5c0 .23-.186.417-.416.417zM10 19.167a.417.417 0 01-.416-.417V6.25a.417.417 0 01.833 0v12.5c0 .23-.187.417-.417.417zM14.583 19.167a.417.417 0 01-.417-.417V6.25a.417.417 0 01.834 0v12.5c0 .23-.187.417-.417.417z" />
            </g>
            <defs>
                <clipPath id="view-cells_svg__clip0">
                    <path fill="#fff" d="M0 0h20v20H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default SvgViewCells;
