import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import LinkUrl from "../../elements/LinkUrl/LinkUrl";
import styles from "./ExternalProfilePromo.module.scss";

const ExternalProfilePromo = ({ headline, image, url, children }) => {
  return (
    <article className={styles.main}>
      <figure>
        <LinkUrl href={url}>
          <Image src={image} width={20} height={20} />
        </LinkUrl>
      </figure>
      {headline && <h2>{headline}</h2>}
      <section>{children}</section>
    </article>
  );
};

ExternalProfilePromo.propTypes = {
  headline: PropTypes.string,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ExternalProfilePromo;
