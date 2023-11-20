import React from "react";
import PropTypes from "prop-types";

const SvgWrapper = ({ width, height, className, children }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
  >
    {children}
  </svg>
);

SvgWrapper.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SvgWrapper;
