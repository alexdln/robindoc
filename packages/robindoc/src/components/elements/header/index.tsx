import "./header.scss";
import React from "react";
import { HeaderMenu, type HeaderMenuProps } from "@src/components/blocks/header-menu";
import { Search, type SearchProps } from "@src/components/blocks/search";
import { SectionDropdown } from "@src/components/blocks/section-dropdown";
import { HeaderSocial } from "@src/components/blocks/header-social";
import { Container } from "@src/components/ui/container";
import { NavLink } from "@src/components/blocks/nav-link";

type SectionOption = {
    key: string;
    href?: string;
    title: string;
    shortTitle?: string;
};

type SectionType = {
    default?: string;
    target: string;
    list: SectionOption[];
};

export type HeaderProps = {
    logo: React.ReactElement;
    links?: {
        title: string;
        href: string;
    }[];
    git?: string | { uri: string; logo: React.ElementType };
    versions?: SectionType;
    locales?: SectionType;
} & HeaderMenuProps &
    SearchProps;

/**
 * Header component for documentation site navigation.
 *
 * @see {@link https://robindoc.com/docs/customization/elements/header Header customization}
 * @see {@link https://robindoc.com/docs/customization/search Search integration}
 */
export const Header: React.FC<HeaderProps> = ({ logo, versions, locales, links = [], git, searcher, translations }) => {
    const { menu, ...searchTranslations } = translations || {};
    const targetVersion = versions?.list.find((version) => version.key === versions.target);
    const versionPrefix = !targetVersion || targetVersion.key === versions?.default ? "" : `/${targetVersion.key}`;
    const targetLocale = locales?.list.find((locale) => locale.key === locales.target);
    const localePrefix = !targetLocale || targetLocale.key === locales?.default ? "" : `/${targetLocale.key}`;

    return (
        <header className="r-header">
            <Container className="r-header-body">
                <div>
                    <NavLink href="/" className="r-header-logo">
                        {logo}
                    </NavLink>
                </div>
                <HeaderMenu translations={{ menu }}>
                    <nav className="r-header-nav">
                        {links.map((link) => (
                            <NavLink
                                href={link.href}
                                className="r-header-link"
                                targetClassName="_target"
                                key={link.title}
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="r-header-actions">
                        <div className="r-header-sections">
                            {versions && targetVersion && (
                                <SectionDropdown
                                    defaultOption={targetVersion.key}
                                    options={versions.list.map((version) => ({
                                        href:
                                            version.href ||
                                            `${localePrefix}${version.key === versions.default ? "" : `/${version.key}`}/`,
                                        key: version.key,
                                        title: version.title,
                                        shortTitle: version.shortTitle,
                                    }))}
                                />
                            )}
                            {locales && targetLocale && (
                                <SectionDropdown
                                    defaultOption={targetLocale.key}
                                    options={locales.list.map((locale) => ({
                                        href:
                                            locale.href ||
                                            `${locale.key === locales.default ? "" : `/${locale.key}`}${versionPrefix}/`,
                                        key: locale.key,
                                        title: locale.title,
                                        shortTitle: locale.shortTitle,
                                    }))}
                                />
                            )}
                        </div>
                        {searcher && <Search searcher={searcher} translations={searchTranslations} />}
                    </div>
                </HeaderMenu>
                {git && <HeaderSocial git={git} />}
            </Container>
        </header>
    );
};
