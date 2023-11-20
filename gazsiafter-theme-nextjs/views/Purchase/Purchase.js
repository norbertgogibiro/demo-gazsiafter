import React from "react";
import LinkUrl from "../../components/elements/LinkUrl/LinkUrl";
import ExternalProfilePromo from "../../components/layout/ExternalProfilePromo/ExternalProfilePromo";
import LogoImage from "../../images/logos/Bandcamp.svg";

const url = "https://paperdeer.bandcamp.com/";

const Purchase = () => {
  return (
    <ExternalProfilePromo headline="Purchase" image={<LogoImage />} url={url}>
      <p>Thank you for considering supporting our journey!</p>

      <p>
        You can buy our music in the best available format and purchase merch
        items, including CD-s and posters on our{" "}
        <LinkUrl href={url}>Bandcamp site</LinkUrl>.
      </p>
    </ExternalProfilePromo>
  );
};

Purchase.urlViewName = "buy-our-products";

export default Purchase;
