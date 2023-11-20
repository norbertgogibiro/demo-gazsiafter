import React from "react";
import LinkUrl from "../../components/elements/LinkUrl/LinkUrl";
import ExternalProfilePromo from "../../components/layout/ExternalProfilePromo/ExternalProfilePromo";
import LogoImage from "../../images/logos/Facebook.svg";

const url = "https://www.facebook.com/paperdeermusic";

const News = () => {
  return (
    <ExternalProfilePromo headline="News" image={LogoImage} url={url}>
      <p>
        We mostly use our <LinkUrl href={url}>Facebook page</LinkUrl> to keep
        you guys updated.
      </p>
    </ExternalProfilePromo>
  );
};

News.urlViewName = "news";

export default News;
