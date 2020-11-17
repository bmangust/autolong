import * as React from "react";

function SvgOrders(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M6.268 0H.458A.453.453 0 000 .458v5.819c0 .25.201.457.457.457h5.817c.25 0 .458-.2.458-.457V.457A.462.462 0 006.268 0zm-.45 5.82H.907V.908h4.91v4.91zM14.549 0H8.732a.457.457 0 00-.458.458v5.819c0 .25.202.457.458.457h5.817c.25 0 .457-.2.457-.457V.457A.46.46 0 0014.55 0zm-.457 5.82h-4.91V.908h4.91v4.91zM6.268 8.272H.458A.457.457 0 000 8.729v5.82c0 .25.201.457.457.457h5.817c.25 0 .458-.201.458-.457v-5.82a.466.466 0 00-.464-.457zm-.45 5.82H.907V9.18h4.91v4.91zM14.549 8.272h-.695a.457.457 0 100 .915h.238v4.904h-4.91v-4.91h4.91c.25 0-.373-.202-.373-.458 0-.25.623-.457.373-.457h-5.36a.457.457 0 00-.458.457v5.82c0 .25.202.457.458.457h5.817c.25 0 .457-.201.457-.457v-5.82a.464.464 0 00-.457-.451z"
                fill="currentColor"
            />
            <path
                d="M5.263 6.228H1.452A1.088 1.088 0 01.366 5.142V1.635c0-.598.488-1.08 1.086-1.08h3.81c.598 0 1.086.488 1.086 1.086v3.508a1.09 1.09 0 01-1.085 1.08zM5.263 14.707H1.452a1.088 1.088 0 01-1.086-1.086V9.81c0-.598.488-1.086 1.086-1.086h3.81c.598 0 1.086.488 1.086 1.086v3.813a1.092 1.092 0 01-1.085 1.085zM13.738 14.707h-3.81a1.088 1.088 0 01-1.086-1.086V9.81c0-.598.488-1.086 1.085-1.086h3.811c.598 0 1.085.488 1.085 1.086v3.813a1.092 1.092 0 01-1.085 1.085zM13.616 6.167H9.988a1.088 1.088 0 01-1.086-1.086v-3.63c0-.597.488-1.085 1.086-1.085h3.628c.597 0 1.085.488 1.085 1.086v3.63a1.092 1.092 0 01-1.085 1.085z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgOrders;
