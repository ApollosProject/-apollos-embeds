import Color from 'color';
import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { TypeStyles } from '../Typography';
import { system } from '../_lib/system';

// Button
// --------------------------------------------------------

function darken(c, by) {
  return Color(c).darken(by).toString();
}

const buttonState = ({ theme, type, disabled, focused, hovered, pressed }) => {
  if (disabled) {
    return css`
      opacity: 0.5;
      background-color: ${type === 'secondary'
        ? 'transparent'
        : theme.colors.base.gray};
      border-color: ${type === 'secondary'
        ? theme.colors.base.gray
        : 'transparent'};
      cursor: not-allowed;
    `;
  }

  if (pressed) {
    return css`
      background-color: ${theme.colors.base.gray};
      border-color: ${type === 'secondary'
        ? theme.colors.fill.system
        : 'transparent'};
      transform: scale(0.98);
    `;
  }

  if (focused || hovered) {
    return css`
      border-color: transparent;
    `;
  }

  return null;
};

const webTransition = ({ theme }) => {
  return css`
    transition: all ${theme.timing.base} ease-out;
  `;

  return null;
};

const buttonTypeProp = ({ theme, type, focused, hovered }) => {
  switch (type) {
    default:
      return css`
        background-color: ${darken(
          theme.colors.text.action,
          focused || hovered ? 0 : 0.16
        )};
      `;
    case 'primary':
      return css`
        background-color: ${darken(
          theme.colors.base.primary,
          focused || hovered ? 0 : 0.16
        )};
      `;

    case 'secondary':
      return css`
        border-width: 2px;
        border-color: ${darken(
          theme.colors.base.secondary,
          focused || hovered ? 0 : 0.16
        )};
      `;
    case 'link':
      return css`
        border-width: 2px;
      `;
  }
};

const buttonSizeProp = ({ size }) => {
  switch (size) {
    default:
    case 'large':
      return css`
        padding: ${themeGet('space.xs')} ${themeGet('space.l')};
      `;
    case 'small':
      return css`
        padding: ${themeGet('space.xxs')} ${themeGet('space.base')};
      `;
    case 'micro':
      return css`
        padding: ${themeGet('space.xxs')} ${themeGet('space.xs')};
      `;
  }
};

const activeLink = ({ focused, hovered, pressed, type }) => {
  if (pressed && type === 'link') {
    return css`
      background-color: none;
      border-color: transparent;
    `;
  }

  if ((focused || hovered) && type === 'link') {
    return css`
      background-color: none;
      border-color: transparent;
    `;
  }
  return null;
};
const buttonTypeLink = ({ type }) => {
  if (type === 'link') {
    return css`
      padding: 0;
    `;
  }
  return null;
};

const Button = withTheme(styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  text-align: center;
  border-color: transparent;
  border-radius: ${themeGet('radii.base')};
  ${buttonTypeProp}
  ${webTransition}
  ${buttonState}
  ${buttonSizeProp}
  ${buttonTypeLink}
  ${activeLink}
  ${system}
`);

// Title
// --------------------------------------------------------

const titleState = ({ theme, disabled, focused, hovered }) => {
  if (disabled) {
    return css`
      color: ${theme.colors.text.secondary};
    `;
  }

  if (focused || hovered) {
    return css`
      color: ${theme.colors.text.primary};
    `;
  }

  return null;
};

const titleStateLink = ({ theme, disabled, focused, hovered, type }) => {
  if (disabled && type === 'link') {
    return css`
      color: ${theme.colors.text.secondary};
    `;
  }

  if ((focused || hovered) && type === 'link') {
    return css`
      color: ${theme.colors.text.primary};
    `;
  }

  return null;
};

const titleTypeProp = ({ type }) => {
  switch (type) {
    default:
      return css`
        color: ${themeGet('colors.text.primary')};
      `;
    case 'primary':
      return null;

    case 'secondary':
      return css`
        color: ${themeGet('colors.text.action')};
      `;
    case 'link':
      return css`
        color: ${themeGet('colors.text.action')};
      `;
  }
};

const titleSizeProp = ({ size }) => {
  switch (size) {
    default:
    case 'large':
      return css`
        ${TypeStyles.LargeSystemText}
      `;

    case 'small':
      return css`
        ${TypeStyles.SystemText}
      `;
    case 'micro':
      return css`
        ${TypeStyles.SmallSystemText}
      `;
  }
};

const Title = withTheme(styled.span`
  ${titleSizeProp}
  ${titleTypeProp}
  font-weight: 600;
  ${titleState}
  ${titleStateLink}
`);

export default {
  Button,
  Title,
};
