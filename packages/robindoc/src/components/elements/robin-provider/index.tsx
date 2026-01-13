import React from "react";

import { NavigateProvider } from "@src/components/contexts/navigate/provider";
import { ThemeDetector } from "@src/components/blocks/theme-detector";
import { NoJs } from "@src/components/blocks/no-js";

import "./robin-provider.scss";

interface RobinProviderProps {
    component?: React.ElementType;
}

export const RobinProvider: React.FC<React.PropsWithChildren<RobinProviderProps>> = ({
    children,
    component: Component = "div",
}) => (
    <Component suppressHydrationWarning className="r-root">
        <ThemeDetector />
        <NavigateProvider>{children}</NavigateProvider>
        <NoJs />
    </Component>
);
