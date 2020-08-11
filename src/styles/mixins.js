import { css } from 'styled-components';

const mixins = {
  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,
};

export default mixins;
