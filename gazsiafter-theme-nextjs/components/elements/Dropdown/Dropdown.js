import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppContext } from "../../misc";
import styles from "./Dropdown.module.scss";
import { clickEvents } from "../../../common/globalVariables";

const keydownEvent = "keydown";
const closerEvents = [...clickEvents, keydownEvent];

const Dropdown = ({
  openerButtonText,
  wrapperClassName,
  triggerClassName,
  onDropdownToggle,
  children,
}) => {
  const [dropdownOpenState, setDropdownOpenState] = useState(false);
  const [componentDidMount, setComponentDidMount] = useState(false);
  const refDropdownContainer = useRef();
  const refDropdownTrigger = useRef();

  const {
    setEyeTrippingState,
    themeClassName,
    refDefensiveEyeTimerId,
    isFullPageViewMode,
  } = useContext(AppContext);

  const handleDropdownClosing = ({ key, type, target }) => {
    const isEscapeButtonKeyup = type === keydownEvent && key === "Escape";

    if (clickEvents.includes(type) || isEscapeButtonKeyup) {
      setDropdownOpenState(false);
      closerEvents.forEach((eventName) =>
        document.removeEventListener(eventName, handleDropdownClosing),
      );

      if (
        target === refDropdownTrigger.current ||
        !target.classList.contains(styles.trigger) ||
        isEscapeButtonKeyup
      ) {
        setEyeTrippingState(false);
      }
    }
  };

  // Imitate componentDidUpdate life cycle from class components:
  useEffect(() => {
    if (!componentDidMount) {
      setComponentDidMount(true);
    } else {
      if (onDropdownToggle) {
        onDropdownToggle(dropdownOpenState);
      }
    }
  }, [dropdownOpenState]);

  // Handle dropdown open state changes:
  useEffect(() => {
    if (dropdownOpenState) {
      closerEvents.forEach((eventName) => {
        document.addEventListener(eventName, handleDropdownClosing);
      });

      if (!isFullPageViewMode) {
        setEyeTrippingState(true);
      }

      if (refDefensiveEyeTimerId.current) {
        clearTimeout(refDefensiveEyeTimerId.current);
      }
    }

    return () => {
      closerEvents.forEach((eventName) =>
        document.removeEventListener(eventName, handleDropdownClosing),
      );
    };
  }, [dropdownOpenState]);

  return (
    <div
      ref={refDropdownContainer}
      className={classNames(
        styles.wrapper,
        styles[themeClassName],
        wrapperClassName,
        {
          [styles.stateOpen]: dropdownOpenState,
          [styles.isFullPageViewMode]: isFullPageViewMode, // TODO: Not yet implemented
        },
      )}
    >
      <button
        ref={refDropdownTrigger}
        className={classNames(styles.trigger, triggerClassName)}
        onClick={() => setDropdownOpenState(!dropdownOpenState)}
      >
        {openerButtonText}
      </button>

      <div className={styles.main}>{children}</div>
    </div>
  );
};

Dropdown.propTypes = {
  wrapperClassName: PropTypes.string,
  triggerClassName: PropTypes.string,
  openerButtonText: PropTypes.string.isRequired,
  onDropdownToggle: PropTypes.func,
  children: PropTypes.node,
};

export default Dropdown;
