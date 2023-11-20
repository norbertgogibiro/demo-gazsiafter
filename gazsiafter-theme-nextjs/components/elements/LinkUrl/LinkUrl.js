import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../misc";
import styles from "./LinkUrl.module.scss";

const LinkUrl = ({
  className,
  href,
  isEnhanced,
  activeClassName,
  onActiveLinkChange,
  children,
}) => {
  const { themeClassName, setMobileMenuOpenState } = useContext(AppContext);
  const router = useRouter();
  const { view } = router.query;
  const isLinkInternal = /\/\?view=(\w+(-\w+)?)+$/.test(href); // TODO: Is there a way to merge it with getInternalUrl()?
  const HTMLElement = isLinkInternal ? "button" : "a";

  const shouldMarkActive =
    isLinkInternal && activeClassName && href.includes(`view=${view}`);

  const htmlAttributes = !isLinkInternal
    ? {
        href,
        target: "_blank",
        rel: "noreferrer",
        onClick: () => {
          setMobileMenuOpenState(false);
        },
      }
    : {
        onClick: () => {
          setMobileMenuOpenState(false);
          router.push(href, null, { shallow: true });
        },
      };

  useEffect(() => {
    if (onActiveLinkChange) {
      onActiveLinkChange();
    }
  }, [onActiveLinkChange, shouldMarkActive]);

  return (
    <HTMLElement
      {...htmlAttributes}
      className={classNames(
        styles.main,
        styles[themeClassName],
        className,
        shouldMarkActive && activeClassName,
      )}
    >
      {children}
      {isEnhanced && (
        <FontAwesomeIcon icon={faStar} className={styles.linkEnhancerStar} />
      )}
    </HTMLElement>
  );
};

LinkUrl.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  isEnhanced: PropTypes.bool,
  activeClassName: PropTypes.string,
  onActiveLinkChange: PropTypes.func,
  children: PropTypes.node,
};

export default LinkUrl;
