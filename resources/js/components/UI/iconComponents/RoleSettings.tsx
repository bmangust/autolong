import * as React from "react";

function SvgRoleSettings(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M1.351 18.45H13.65c.743 0 1.351-.608 1.351-1.351v-7.35c0-.743-.608-1.35-1.351-1.35h-.951V5.197A5.205 5.205 0 007.5 0a5.205 5.205 0 00-5.198 5.198v3.2h-.95C.607 8.398 0 9.006 0 9.75v7.349c0 .743.608 1.35 1.351 1.35zM3.227 5.198A4.279 4.279 0 017.5.925a4.279 4.279 0 014.273 4.273v3.2H3.227v-3.2zM.925 9.75c0-.234.192-.427.426-.427H13.65c.234 0 .426.193.426.427v7.349a.429.429 0 01-.426.426H1.35a.429.429 0 01-.426-.426v-7.35z"
                fill="currentColor"
            />
            <path
                d="M7.5 15.306a1.886 1.886 0 001.884-1.884A1.886 1.886 0 007.5 11.54a1.884 1.884 0 000 3.767zm0-2.839a.96.96 0 01.959.96.96.96 0 01-.959.958.96.96 0 01-.959-.959.96.96 0 01.96-.959z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgRoleSettings;
