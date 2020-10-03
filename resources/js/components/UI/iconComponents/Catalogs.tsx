import * as React from "react";

function SvgCatalogs(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            {...props}
        >
            <path
                d="M6.312 8.272h-.694a.458.458 0 100 .915h.24v4.904H.915v-4.91h4.943c.251 0-.375-.202-.375-.458 0-.25.626-.457.375-.457H.46a.458.458 0 00-.46.457v5.82c0 .25.203.457.46.457h5.858c.252 0 .46-.201.46-.457v-5.82a.467.467 0 00-.466-.451z"
                fill="currentColor"
            />
            <path
                d="M5.496 14.707H1.664a1.092 1.092 0 01-1.093-1.086V9.81c0-.598.491-1.086 1.093-1.086h3.838c.601 0 1.093.488 1.093 1.086v3.813a1.101 1.101 0 01-1.1 1.085zM6.312 0H.46A.455.455 0 000 .458v5.819c0 .25.203.457.46.457h5.858c.252 0 .46-.2.46-.457V.457A.464.464 0 006.313 0zm-.454 5.82H.915V.908h4.943v4.91z"
                fill="currentColor"
            />
            <path
                d="M5.373 6.167H1.726A1.092 1.092 0 01.633 5.082v-3.63c0-.598.491-1.086 1.093-1.086h3.653c.602 0 1.093.488 1.093 1.086v3.63a1.101 1.101 0 01-1.1 1.085zM14.512 2H8.488A.492.492 0 008 2.5c0 .271.219.5.488.5h6.024c.27 0 .488-.22.488-.5s-.219-.5-.488-.5zM14.512 10H8.488a.492.492 0 00-.488.5c0 .271.219.5.488.5h6.024c.27 0 .488-.22.488-.5s-.219-.5-.488-.5zM8.603 5h2.793c.333 0 .604-.22.604-.5 0-.271-.27-.5-.604-.5H8.604C8.271 4 8 4.22 8 4.5s.27.5.603.5zM8.603 13h2.793c.333 0 .604-.22.604-.5 0-.271-.27-.5-.604-.5H8.604c-.332 0-.603.22-.603.5s.27.5.603.5z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgCatalogs;
