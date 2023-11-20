import React from "react";
import LinkUrl from "../../components/elements/LinkUrl/LinkUrl";
import ExternalProfilePromo from "../../components/layout/ExternalProfilePromo/ExternalProfilePromo";
import LogoImage from "../../images/logos/SongKick.svg";

const url = "https://www.songkick.com/artists/8414153-paperdeer";

const Concerts = () => (
  <ExternalProfilePromo headline="Concerts" image={<LogoImage />} url={url}>
    <p>
      Our next gigs are announced on <LinkUrl href={url}>SongKick</LinkUrl>.
      Feel free to follow our profile to get notified whenever to play close to
      your location!
    </p>
  </ExternalProfilePromo>
);

Concerts.urlViewName = "concerts";

export default Concerts;
