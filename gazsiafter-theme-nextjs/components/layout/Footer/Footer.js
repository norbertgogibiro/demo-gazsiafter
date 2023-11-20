import React, { useContext } from "react";
import classNames from "classnames";
import { useSlowGrowingStarUIChangesDelay } from "../../../common/hooks";
import { AppContext } from "../../misc";
import { getInternalUrl } from "../../../views";
import Socials from "../../../views/Socials/Socials";
import { LinkUrl } from "../../elements";
import styles from "./Footer.module.scss";

const Footer = () => {
  const { themeClassName } = useContext(AppContext);
  const hasUIChangeBeenDelayed = useSlowGrowingStarUIChangesDelay();

  return (
    <footer
      className={classNames(styles.main, styles[themeClassName], {
        [styles.isFullPageViewMode]: hasUIChangeBeenDelayed,
      })}
    >
      <small>
        <p>
          <LinkUrl href={getInternalUrl(Socials.urlViewName)}>
            Social links
          </LinkUrl>
          <br />
          Copyright &copy; <span className="current-year"></span> Paperdeer.
          <br />
          All Rights Reserved
        </p>
      </small>
    </footer>
  );
};

export default Footer;
