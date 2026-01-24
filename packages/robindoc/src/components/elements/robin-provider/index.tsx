import React from "react";

import { NavigateProvider } from "@src/components/stores/navigate/provider";
import { PreferencesDetector } from "@src/components/blocks/preferences-detector";
import { NoJs } from "@src/components/blocks/no-js";

import "./robin-provider.scss";

interface RobinProviderProps {
    component?: React.ElementType;
}

/**
 * Root provider component that wraps the entire Robindoc application.
 * Required for proper functionality of preferences, navigation, and other features.
 *
 * @example
 * ```tsx
 * <RobinProvider>
 *   <Header logo={<Logo />} />
 *   <DocsContainer>
 *     <Page pathname="/docs" />
 *   </DocsContainer>
 * </RobinProvider>
 * ```
 *
 * @see {@link https://robindoc.com/docs/customization/elements Elements customization}
 */
export const RobinProvider: React.FC<React.PropsWithChildren<RobinProviderProps>> = ({
    children,
    component: Component = "div",
}) => (
    <Component suppressHydrationWarning className="r-root">
        <PreferencesDetector />
        <NavigateProvider>{children}</NavigateProvider>
        <NoJs />
    </Component>
);
