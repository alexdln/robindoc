import Link from "next/link";

import "./action.scss";

export interface ActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    variant?: "primary" | "secondary";
}

export const Action = ({ className, variant = "primary", ...props }: ActionProps) => (
    <Link
        className={`action${className ? ` ${className}` : ""} ${variant === "primary" ? "action-primary" : "action-secondary"}`}
        {...props}
    />
);
