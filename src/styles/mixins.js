import { css, keyframes } from 'styled-components';

const mixins = {
  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,
  glow: keyframes`
    0%: { opacity: 0.5 };
    50%': { opacity: 1 };
  `,
};

export default mixins;
