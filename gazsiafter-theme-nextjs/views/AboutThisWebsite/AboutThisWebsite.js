import React from "react";
import { LinkEmail, LinkUrl } from "../../components/elements";

const AboutThisWebsite = () => {
  return (
    <article>
      <p>
        This website was made by{" "}
        <LinkUrl
          label="Norbert Biro"
          href="https://dk.linkedin.com/in/norbert-biro"
        />{" "}
        in 2021, based on{" "}
        <LinkUrl href="https://www.sabaanwar.fr">Saba Anwar</LinkUrl>
        &apos;s theme design for our video clip{" "}
        <LinkUrl href="https://www.youtube.com/watch?v=Q-ylt1D2rm4">
          Gazsiafter
        </LinkUrl>
        .
      </p>

      <p>
        If you have any question, or you wish to share any feedback, feel free
        to write to{" "}
        <LinkEmail user="website" domain="paperdeermusic" tld="co.uk" />!
      </p>
    </article>
  );
};

AboutThisWebsite.urlViewName = "about-this-website";

export default AboutThisWebsite;
