import React from "react";
import { LinkUrl } from "../../components/elements";
import LogoSpotify from "../../images/logos/Spotify.svg";
import LogoAppleMusic from "../../images/logos/Apple.svg";
import LogoDeezer from "../../images/logos/Deezer.svg";
import LogoYoutubeMusic from "../../images/logos/Youtube.svg";
import styles from "./StreamOurMusic.module.scss";

const streamingServices = [
  {
    name: "Apple Music",
    logo: <LogoAppleMusic />,
    url: "https://itunes.apple.com/us/artist/paperdeer/795131316",
  },
  {
    name: "Spotify",
    logo: <LogoSpotify />,
    url: "https://open.spotify.com/artist/2dvKZH9pulH1g2m26HkoIx",
  },
  {
    name: "Deezer",
    logo: <LogoDeezer />,
    url: "https://www.deezer.com/en/artist/5468085",
  },
  {
    name: "Youtube Music",
    logo: <LogoYoutubeMusic />,
    url: "https://music.youtube.com/channel/UCI-cVxCzSggq8Yk-9s-oEKQ",
  },
];

const StreamOurMusic = () => {
  return (
    <article className={styles.main}>
      <h2>Stream our music</h2>
      <ul className={styles.streamingServicesList}>
        {streamingServices.map(({ name, logo, url }) => (
          <li>
            <LinkUrl href={url} alt={`${name} logo`}>
              <div className={styles.streamingServiceLogo}>{logo}</div>
              <span>{name}</span>
            </LinkUrl>
          </li>
        ))}
      </ul>
    </article>
  );
};

StreamOurMusic.urlViewName = "stream-our-music";

export default StreamOurMusic;
