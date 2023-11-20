import React from "react";
import LinkUrl from "../../components/elements/LinkUrl/LinkUrl";
import ExternalProfilePromo from "../../components/layout/ExternalProfilePromo/ExternalProfilePromo";
import LogoImage from "../../images/logos/Youtube.svg";

const url = "https://www.youtube.com/c/Paperdeer";

const Videos = () => {
  return (
    <ExternalProfilePromo headline="Videos" image={<LogoImage />} url={url}>
      <p>
        All our music videos are available on our{" "}
        <LinkUrl href={url}>official Youtube channel</LinkUrl>.
      </p>
    </ExternalProfilePromo>
  );
};

Videos.urlViewName = "videos";

export default Videos;
