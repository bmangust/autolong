import * as React from "react";

function SvgDocument(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 73 77" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M72.397 21.018l.003.003c.225.224.35.521.35.846v49.208c0 3.123-2.564 5.675-5.726 5.675H22.36c-3.162 0-5.726-2.552-5.726-5.675V57.5H4.463A4.202 4.202 0 01.25 53.298V31.086c0-2.298 1.884-4.187 4.213-4.187h12.172V5.925C16.635 2.802 19.2.25 22.361.25h29.412c.338 0 .653.136.897.377l.001.001 19.726 20.39zM52.316 3.827l-.43-.444v17.606H68.93l-.41-.424L52.316 3.827zM4.463 55.037h.25v-.015h39.98a1.73 1.73 0 001.732-1.724V31.086a1.73 1.73 0 00-1.732-1.724H4.463a1.73 1.73 0 00-1.732 1.724v22.227a1.73 1.73 0 001.732 1.724zM19.366 57.5h-.25v13.575c0 1.78 1.461 3.212 3.245 3.212h44.663c1.785 0 3.245-1.448 3.245-3.212V23.42H50.654a1.23 1.23 0 01-1.233-1.223v-19.5h-27.06c-1.785 0-3.245 1.449-3.245 3.227V26.9h25.577c2.33 0 4.213 1.875 4.213 4.187v22.227c0 2.312-1.884 4.187-4.213 4.187H19.366z"
                fill="currentColor"
                stroke="#F7F8FA"
                strokeWidth={0.5}
            />
        </svg>
    );
}

export default SvgDocument;