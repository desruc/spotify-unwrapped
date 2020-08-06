import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { usePopper } from 'react-popper';
import styled from 'styled-components';

function Dropdown({ label, value, options, onSelect }) {
  // Hooks
  const referenceRef = useRef(null);
  const popperRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: 'bottom',
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            padding: 16,
            rootBoundary: 'document',
          },
        },
        // {
        //   name: 'offset',
        //   options: {
        //     offset: [-76, -60]
        //   },
        // },
      ],
    }
  );

  // Local state
  const [visible, setVisibility] = useState(false);

  // Event handlers
  function handleDocumentClick(event) {
    if (
      referenceRef.current.contains(event.target) ||
      popperRef.current.contains(event.target)
    ) {
      return;
    }

    setVisibility(false);
  }

  function handleDropdownClick() {
    setVisibility(!visible);
  }

  function handleItemClick(e, val) {
    e.stopPropagation();
    if (onSelect) onSelect(val);
    handleDropdownClick();
  }

  // Listen for clicks and close dropdown on body
  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  // Constants
  const computedLabel = label || options.find((o) => o.value === value).label;
  const computedPopperStyles = {
    ...styles.popper,
    zIndex: 10,
  };

  return (
    <>
      <Button
        ref={referenceRef}
        onClick={handleDropdownClick}
        role="presentation"
      >
        {computedLabel}
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g data-name="Layer 2">
            <g data-name="arrow-ios-downward">
              <rect width="24" height="24" opacity="0" />
              <path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z" />
            </g>
          </g>
        </svg>
      </Button>
      <div ref={popperRef} style={computedPopperStyles} {...attributes.popper}>
        <DropdownContainer style={styles.offset} visible={visible}>
          {options.map((o) => {
            const disabled = o.value === value;
            return (
              <DropdownItem
                key={o.value}
                value={o.value}
                onClick={disabled ? null : (e) => handleItemClick(e, o.value)}
                disabled={disabled}
              >
                {o.label}
              </DropdownItem>
            );
          })}
        </DropdownContainer>
      </div>
    </>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

Dropdown.defaultProps = {
  label: null,
};

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  font-weight: 600;
  text-decoration: none !important;
  user-select: none;
  min-width: 150px;
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  svg {
    margin-left: 5px;
  }
`;

const DropdownContainer = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.14);
  padding: 5px;
  border-radius: 6px;
`;

const DropdownItem = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  padding-right: 16px;
  padding-left: 16px;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  color: ${({ disabled }) => (disabled ? '#EAEAEA !important' : '#000000')};
  &:hover {
    color: ${(props) => props.theme.main};
  }
  &:active {
    font-weight: 700;
    color: ${(props) => props.theme.main};
  }
`;

export default Dropdown;
