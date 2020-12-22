import * as React from "react";

function SvgSettings(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M14.665 6.232L12.908 5.8a5.672 5.672 0 00-.367-.894l.895-1.494a.438.438 0 00-.065-.534l-1.249-1.25a.438.438 0 00-.534-.064l-1.494.895a5.68 5.68 0 00-.894-.367L8.775.335A.448.448 0 008.343 0H6.586c-.2 0-.38.142-.431.335L5.73 2.092a5.682 5.682 0 00-.895.367l-1.487-.888a.438.438 0 00-.535.064L1.564 2.878a.438.438 0 00-.064.534l.895 1.494c-.148.29-.27.585-.367.894l-1.693.432A.435.435 0 000 6.657v1.757c0 .2.142.38.335.425l1.693.431c.096.31.219.606.367.895L1.5 11.66a.438.438 0 00.064.534l1.25 1.25c.14.14.36.166.534.063l1.493-.894c.29.148.586.27.895.367l.425 1.693a.448.448 0 00.431.334H8.35c.2 0 .38-.141.431-.334l.425-1.694c.309-.096.605-.218.895-.366l1.493.894a.438.438 0 00.535-.064l1.249-1.249a.438.438 0 00.064-.534l-.895-1.494c.148-.29.27-.586.367-.895l1.758-.43a.435.435 0 00.335-.426V6.657a.454.454 0 00-.342-.425zM7.468 9.734a2.198 2.198 0 010-4.397 2.198 2.198 0 010 4.397z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgSettings;
