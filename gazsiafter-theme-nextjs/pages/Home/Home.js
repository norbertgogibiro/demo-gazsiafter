import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import classNames from "classnames";
import { getRandomAmount } from "../../common/utils";
import { getInternalUrl, isViewFullPage } from "../../views";
import Socials from "../../views/Socials/Socials";
import { ErrorBoundary, AppContext } from "../../components/misc";
import { Header, Main, Footer } from "../../components/layout";
import styles from "./Home.module.scss";

const faviconFolderPath = "/favicons";
const defaultThemeName = "orange";
const minAllowedProbability = 0;
const maxAllowedProbability = 100;
const eyeHitFrequency = 500;
const eyeHitsForTripping = 3;
const eyeHitsForPopup = Math.floor(
  getRandomAmount(eyeHitsForTripping + 1, eyeHitsForTripping + 4),
);
const defensiveEyeDuration = 3000;
const themeProbability = {
  orange: 35,
  yellow: 10,
  blue: 10,
  night: 10,
  dark: 10,
  poison: 5,
};

const getRandomThemeName = (currentThemeName) => {
  const themeProbabilityValues = Object.values(themeProbability);
  const allValuesValid = themeProbabilityValues.every((val) => {
    const isWholeNumber = Number.isInteger(val);
    const isValid =
      isWholeNumber &&
      val > minAllowedProbability - 1 &&
      val < maxAllowedProbability + 1;

    if (!isValid) {
      console.error(
        `ERROR: invalid theme probability value "${val}" - 
      	it has to be a whole number between ${minAllowedProbability} and ${maxAllowedProbability}`,
      );
    }

    return isValid;
  });

  if (!allValuesValid) {
    return defaultThemeName;
  }

  const themeNameDice = Object.entries(themeProbability)
    .filter(({ 0: themeName }) => themeName !== currentThemeName)
    .map(({ 0: themeName, 1: probability }) =>
      new Array(probability).fill(themeName),
    )
    .flat();

  return themeNameDice[
    Math.round(getRandomAmount(0, themeNameDice.length - 1))
  ];
};

export default function Home() {
  const [themeName, setThemeName] = useState();
  const [isMobileMenuOpen, setMobileMenuOpenState] = useState(false);
  const [isEyeTripping, setEyeTrippingState] = useState(false);
  const [isEyeClosed, setEyeClosed] = useState(false);
  const [lastDropTriggerTime, setLastDropTriggerTime] = useState(null);
  const [eyeHitCount, setEyeHitCount] = useState(0);
  const refEyeHitTimerId = useRef(null);
  const refDefensiveEyeTimerId = useRef(null);
  const router = useRouter();
  const { view } = router.query;
  const isFullPageViewMode = view && isViewFullPage(view);
  const switchTheme = () => setThemeName(getRandomThemeName(themeName));
  const themeClassName = `theme-${themeName}`;
  const appContextProps = {
    themeClassName,
    switchTheme,
    isMobileMenuOpen,
    isEyeTripping,
    isEyeClosed,
    lastDropTriggerTime,
    setMobileMenuOpenState,
    setEyeTrippingState,
    setEyeClosed,
    setLastDropTriggerTime,
    refDefensiveEyeTimerId,
    isFullPageViewMode,
  };

  const hasRenderedServerSide = typeof window !== "undefined";

  // Set random theme when loading the app:
  useEffect(() => {
    if (hasRenderedServerSide) {
      setThemeName(getRandomThemeName());
    }
  }, [hasRenderedServerSide]);

  // Set random theme with trippy eye if the eye receives
  // a certain number of hits:
  useEffect(() => {
    if (lastDropTriggerTime) {
      setEyeHitCount(eyeHitCount + 1);

      if (refEyeHitTimerId.current) {
        clearTimeout(refEyeHitTimerId.current);
      }

      if (refDefensiveEyeTimerId.current) {
        clearTimeout(refDefensiveEyeTimerId.current);
      }

      if (eyeHitCount === eyeHitsForTripping) {
        switchTheme();
        setEyeTrippingState(true);
      }

      if (eyeHitCount === eyeHitsForPopup) {
        router.push(getInternalUrl(Socials.urlViewName), null, {
          shallow: true,
        });
      }

      refEyeHitTimerId.current = setTimeout(() => {
        setEyeHitCount(0);

        if (eyeHitCount >= eyeHitsForTripping) {
          refDefensiveEyeTimerId.current = setTimeout(() => {
            setEyeTrippingState(false);
            switchTheme();
          }, defensiveEyeDuration);
        }
      }, eyeHitFrequency);
    }
  }, [lastDropTriggerTime]);

  return (
    <div
      className={classNames(styles.layoutPositioner, {
        [styles.isMobileMenuOpen]: isMobileMenuOpen,
      })}
    >
      <div
        className={classNames(
          styles.main,
          themeName ? styles[themeClassName] : styles.noTheme,
        )}
      >
        <Head>
          <meta charSet="UTF-8" />
          <meta name="author" content="Paperdeer" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${faviconFolderPath}/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${faviconFolderPath}/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="194x194"
            href={`${faviconFolderPath}/favicon-194x194.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href={`${faviconFolderPath}/android-chrome-192x192.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${faviconFolderPath}/favicon-16x16.png`}
          />
          <link rel="manifest" href={`${faviconFolderPath}/site.webmanifest`} />
          <link
            rel="mask-icon"
            href={`${faviconFolderPath}/safari-pinned-tab.svg`}
            color="#f26539"
          />
          <link rel="shortcut icon" href={`${faviconFolderPath}/favicon.ico`} />
          <meta name="apple-mobile-web-app-title" content="Paperdeer" />
          <meta name="application-name" content="Paperdeer" />
          <meta name="msapplication-TileColor" content="#f26539" />
          <meta
            name="msapplication-config"
            href={`${faviconFolderPath}/browserconfig.xml`}
          />
          <meta name="theme-color" content="#f26539" />
          <title>Paperdeer</title>
          <meta
            name="description"
            content="Homepage of the Budapest- and Copenhagen-based indie electronic music band Paperdeer"
          />
        </Head>

        <ErrorBoundary>
          <AppContext.Provider value={appContextProps}>
            <Header />
            <Main />
            <Footer />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
    </div>
  );
}
