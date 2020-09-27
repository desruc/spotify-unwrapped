import { keyframes as styledKeyframes } from 'styled-components';

const keyframes = {
  glow: styledKeyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }`,
  rotate: styledKeyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }`,
};

export default keyframes;
