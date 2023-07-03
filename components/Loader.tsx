/** @format */

import { motion } from 'framer-motion';

const variants = {
  rotate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
};

const Loader = () => (
  <motion.img
    src="/steering-wheel.svg"
    alt="loader"
    width={50}
    height={50}
    className="object-contains"
    variants={variants}
    animate="rotate"
  />
);

export default Loader;
