"use client";

import { useEffect } from "react";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";

const AnimationProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 300,
      duration: 500,
    });

    AOS.refresh();
  }, []);

  return <>{children}</>;
};

export default AnimationProvider;

AnimationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
