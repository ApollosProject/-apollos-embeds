import React from 'react';

import { withTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { system, TypeStyles, utils } from '../../../ui-kit';

const Heading = withTheme(styled.h2`
  ${TypeStyles.H3}
  margin-bottom: ${themeGet('space.xs')};
`);

const SubHeading = withTheme(styled.h5`
  ${TypeStyles.H6};
  margin-bottom: ${themeGet('space.base')};
  color: ${themeGet('colors.neutral.gray')};
  font-weight: 500;
  opacity: 0.9;
`);

export { Heading, SubHeading };
