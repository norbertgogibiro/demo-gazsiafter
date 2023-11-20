import React, { useContext } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { AppContext } from "../components/misc/index";
import StreamOurMusic from "./StreamOurMusic/StreamOurMusic";
import Purchase from "./Purchase/Purchase";
import Discography from "./Discography/Discography";
import Videos from "./Videos/Videos";
import News from "./News/News";
import Pictures from "./Pictures/Pictures";
import Concerts from "./Concerts/Concerts";
import Contact from "./Contact/Contact";
import Socials from "./Socials/Socials";
import AboutThisWebsite from "./AboutThisWebsite/AboutThisWebsite";
import UseOurMusic from "./UseOurMusic/UseOurMusic";
import RemixOurSongs from "./RemixOurSongs/RemixOurSongs";
import NotFound from "./NotFound/NotFound";
import styles from "./index.module.scss";
import Biography from "./Biography/Biography";
import { useSlowGrowingStarUIChangesDelay } from "../common/hooks";

const NullViewForHome = () => null;
NullViewForHome.urlViewName = "";

const views = [
  StreamOurMusic,
  Purchase,
  Discography,
  Socials,
  Videos,
  News,
  Pictures,
  Concerts,
  Contact,
  AboutThisWebsite,
  NullViewForHome,
  // UseOurMusic,
  // RemixOurSongs,
  // Biography,
];

export const getInternalUrl = (urlViewName) => `/?view=${urlViewName}`;

export const isViewFullPage = (checkedViewName) => {
  return !!views.find(({ urlViewName, isFullPageView }) => {
    return checkedViewName === urlViewName && isFullPageView;
  });
};

const ViewManager = () => {
  const { isFullPageViewMode } = useContext(AppContext);
  const hasUIChangeBeenDelayed = useSlowGrowingStarUIChangesDelay();
  const router = useRouter();
  const { view: routerQueryValue = "" } = router.query;

  const ViewContent =
    views.find(({ urlViewName }) => {
      return urlViewName === routerQueryValue;
    }) || NotFound;

  return (
    <div
      className={classNames(styles.main, {
        [styles.isFullPageViewMode]: isFullPageViewMode,
        [styles.isStarBigEnough]: hasUIChangeBeenDelayed,
      })}
    >
      <ViewContent />
    </div>
  );
};

export default ViewManager;
