import React from "react";
import LinkUrl from "../../components/elements/LinkUrl/LinkUrl";
import ExternalProfilePromo from "../../components/layout/ExternalProfilePromo/ExternalProfilePromo";
import LogoImage from "../../images/logos/Instagram.svg";

const url = "https://www.instagram.com/paperdeermusic";

const Pictures = () => {
  return (
    <ExternalProfilePromo headline="Pictures" image={<LogoImage />} url={url}>
      <p>
        Find photos on our <LinkUrl href={url}>Instagram feed</LinkUrl>.
      </p>
    </ExternalProfilePromo>
  );
};

Pictures.urlViewName = "pictures";

export default Pictures;
