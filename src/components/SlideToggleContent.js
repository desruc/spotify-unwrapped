import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

const visibleStyle = { height: 'auto', opacity: 1, overflow: 'visible' };
const hiddenStyle = { opacity: 0, height: 0, overflow: 'hidden' };

function getElementHeight(ref) {
  return ref.current ? ref.current.getBoundingClientRect().height : 0;
}

const SlideToggleContent = ({ isVisible, children }) => {
  const isVisibleRef = useRef(isVisible);
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  const transitions = useTransition(isVisible, null, {
    enter: () => async (next, cancel) => {
      const height = getElementHeight(innerRef);

      cancel();

      await next({ height, opacity: 1, overflow: 'hidden' });
      await next(visibleStyle);
    },
    leave: () => async (next, cancel) => {
      const height = getElementHeight(containerRef);

      cancel();

      await next({ height, overflow: 'hidden' });
      await next(hiddenStyle);

      isVisibleRef.current = false;
    },
    from: isVisibleRef.current ? visibleStyle : hiddenStyle,
    unique: true,
  });

  return transitions.map(({ item: show, props: springProps, key }) => {
    if (show) {
      return (
        <animated.div ref={containerRef} key={key} style={springProps}>
          <div ref={innerRef}>{children}</div>
        </animated.div>
      );
    }

    return null;
  });
};

SlideToggleContent.defaultProps = {
  forceSlideIn: false,
};

SlideToggleContent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default SlideToggleContent;
