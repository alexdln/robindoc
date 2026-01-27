import React from "react";

import { TabsHeader, type TabsHeaderProps } from "./tabs-header";
import { TabsStyles } from "./tabs-styles";

import "./tabs.scss";

export interface TabsProps {
    insertStyles?: boolean;
    tabsData: { [tabKey: string]: { element: React.ReactNode; tabName: string } };
    blockKey?: string;
    type?: TabsHeaderProps["type"];
}

export const Tabs: React.FC<TabsProps> = ({ insertStyles, tabsData, blockKey, type }) => {
    const tabsKeys = Object.keys(tabsData);

    if (tabsKeys.length === 1) {
        return tabsData[tabsKeys[0]].element;
    }

    const tabs = tabsKeys.map((tab) => ({ name: tabsData[tab].tabName, id: tab }));
    const tabsTypeId = blockKey || tabsKeys.sort().join("-");

    return (
        <div className={`r-tabs r-tabs__${tabsTypeId}`}>
            {insertStyles && <TabsStyles tabsKeys={tabsKeys} tabsTypeId={tabsTypeId} />}
            <TabsHeader tabs={tabs} tabsTypeId={tabsTypeId} type={type} />
            <div className={`r-tab-list r-tab-list__${tabsTypeId}`}>
                {tabsKeys.map((tabKey) => (
                    <div key={tabKey} className={`r-tab r-tab_${tabKey}`}>
                        {tabsData[tabKey].element}
                    </div>
                ))}
            </div>
        </div>
    );
};
