import React from "react";

export interface TabsStylesProps {
    tabsTypeId: string;
    tabsKeys: string[];
}

export const TabsStyles: React.FC<TabsStylesProps> = ({ tabsTypeId, tabsKeys }) => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
.r-root:not(.r-tabs-global__${tabsTypeId}) .r-tabs__${tabsTypeId} .r-tab:not(.r-tab_${tabsKeys[0]}) {display: none}
.r-root:not(.r-tabs-global__${tabsTypeId}) .r-tabs__${tabsTypeId} .r-tab-header_${tabsKeys[0]} {background: var(--r-main-50);z-index: 2;pointer-events: none;color:var(--r-main-950)}
${tabsKeys.map((tabKey) => `.r-tabs-global__${tabsTypeId}_${tabKey} .r-tabs__${tabsTypeId} .r-tab:not(.r-tab_${tabKey}) {display: none}`).join("")}
${tabsKeys.map((tabKey) => `.r-tabs-global__${tabsTypeId}_${tabKey} .r-tabs__${tabsTypeId} .r-tab-header_${tabKey} {background: var(--r-main-50);z-index: 2;pointer-events: none;color:var(--r-main-950)}`).join("")}
`,
        }}
    />
);
