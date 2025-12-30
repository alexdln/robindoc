import React from "react";

export const NoJs = () => (
    <noscript>
        <style>
            {`
                .r-no-js {
                    cursor: not-allowed;
                    box-sizing: border-box;
                }
                .r-no-js:hover,
                .r-no-js:focus,
                .r-no-js:focus-within {
                    z-index: 10;
                }
                .r-no-js::after {
                    content: "Please enable JavaScript";
                    display: none;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    font-family: var(--monospace-font, monospace, monospace);
                    font-size: 12px;
                    width: 100%;
                    min-width: 120px;
                    transform: translateY(-50%);
                    background-color: var(--r-neutral-900);
                    color: var(--r-neutral-100);
                    border-radius: 4px;
                    padding: 4px 12px;
                    pointer-events: none;
                    box-sizing: border-box;
                }
                .r-no-js._to-right::after {
                    right: auto;
                    left: 0;
                }
                .r-no-js:hover::after,
                .r-no-js:focus::after,
                .r-no-js:focus-within::after {
                    display: block;
                }
            `}
        </style>
    </noscript>
);
