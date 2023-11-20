import React from "react";
import Image from "next/image";
import { discography } from "../../common/data";
import { getParsedCssPixelsSize } from "../../common/utils";
import { LinkUrl } from "../../components/elements";
import styles from "./Discography.module.scss";

const Discography = () => {
  return (
    <ul className={styles.main}>
      {discography.map(({ title, cover, urlFriendlyTitle }) => (
        <li key={urlFriendlyTitle}>
          <LinkUrl href={urlFriendlyTitle} className={styles.releaseLink}>
            <Image
              src={cover}
              alt={`Album art for "${title}"`}
              width={getParsedCssPixelsSize(styles.sizeCoverImg)}
              height={getParsedCssPixelsSize(styles.sizeCoverImg)}
            />
            {/* <p>{title}</p> */}
          </LinkUrl>
        </li>
      ))}
    </ul>
  );
};

Discography.isFullPageView = true;
Discography.urlViewName = "releases";

export default Discography;
