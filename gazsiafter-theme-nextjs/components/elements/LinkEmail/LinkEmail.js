import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { AppContext } from "../../misc";
import styles from "./LinkEmail.module.scss";

const LinkEmail = ({ user, domain, tld }) => {
  const { themeClassName } = useContext(AppContext);
  const [finalLink, setFinalLink] = useState("");

  useEffect(() => {
    setFinalLink(`mailto:${user}@${domain}.${tld}`);
  }, []);

  return (
    <a
      href={finalLink}
      className={classNames(styles.main, styles[themeClassName])}
      data-user={user}
      data-domain={domain}
      data-tld={tld}
    />
  );
};

LinkEmail.propTypes = {
  user: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  tld: PropTypes.string.isRequired,
};

export default LinkEmail;
