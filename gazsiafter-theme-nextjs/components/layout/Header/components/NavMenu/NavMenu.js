import React, { useState, useRef, useContext, useLayoutEffect } from "react";
import classNames from "classnames";
import { useSlowGrowingStarUIChangesDelay } from "../../../../../common/hooks";
import { AppContext } from "../../../../misc";
import { getInternalUrl } from "../../../../../views";
import { LinkUrl, Dropdown } from "../../../../elements";
import StreamOurMusic from "../../../../../views/StreamOurMusic/StreamOurMusic";
import Purchase from "../../../../../views/Purchase/Purchase";
import RemixOurSongs from "../../../../../views/RemixOurSongs/RemixOurSongs";
import UseOurMusic from "../../../../../views/UseOurMusic/UseOurMusic";
import Discography from "../../../../../views/Discography/Discography";
import Videos from "../../../../../views/Videos/Videos";
import Biography from "../../../../../views/Biography/Biography";
import News from "../../../../../views/News/News";
import Pictures from "../../../../../views/Pictures/Pictures";
import Concerts from "../../../../../views/Concerts/Concerts";
import Contact from "../../../../../views/Contact/Contact";
import AboutThisWebsite from "../../../../../views/AboutThisWebsite/AboutThisWebsite";
import styles from "./NavMenu.module.scss";

const getLinkGroup = (label, links) => ({ label, links });
const getInternalLink = (label, { urlViewName }) => ({
  label,
  href: getInternalUrl(urlViewName),
});

const menuItems = [
  getLinkGroup("Music", [
    getInternalLink("Listen", StreamOurMusic),
    getInternalLink("Purchase", Purchase),
    getInternalLink("Discography", Discography),
  ]),
  getInternalLink("Videos", Videos),
  getInternalLink("Remix our songs!", RemixOurSongs),
  getInternalLink("Use our music!", UseOurMusic),
  getLinkGroup("More", [
    getInternalLink("Bio", Biography),
    getInternalLink("News", News),
    getInternalLink("Pictures", Pictures),
    getInternalLink("Concerts", Concerts),
    getInternalLink("Write to us", Contact),
    getInternalLink("About this website", AboutThisWebsite),
  ]),
];

const NavMenu = () => {
  const [hasActiveLink, setHasActiveLink] = useState(false);
  const hasUIChangeBeenDelayed = useSlowGrowingStarUIChangesDelay();
  const { themeClassName } = useContext(AppContext);
  const refNavList = useRef();

  useLayoutEffect(() => {
    const isActiveLinkFound = !!refNavList.current.querySelector(
      `.${styles.activeMenuItem}`,
    );

    setHasActiveLink(isActiveLinkFound);
  });

  return (
    <nav
      className={classNames(styles.main, styles[themeClassName], {
        [styles.isFullPageViewMode]: hasUIChangeBeenDelayed,
      })}
    >
      <ul
        ref={refNavList}
        className={classNames(styles.navList, {
          [styles.hasActiveLink]: hasActiveLink,
        })}
      >
        {menuItems.map(({ label: itemName, href, links }) => {
          const hasSubmenu = Array.isArray(links);

          return (
            <li key={itemName}>
              {hasSubmenu ? (
                <Dropdown
                  triggerClassName={styles.menuItemContent}
                  openerButtonText={itemName}
                >
                  <ul>
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <LinkUrl className={styles.dropdownLink} href={href}>
                          {label}
                        </LinkUrl>
                      </li>
                    ))}
                  </ul>
                </Dropdown>
              ) : (
                <LinkUrl
                  href={href}
                  className={styles.menuItemContent}
                  activeClassName={styles.activeMenuItem}
                >
                  {itemName}
                </LinkUrl>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
