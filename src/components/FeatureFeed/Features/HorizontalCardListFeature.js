import React from 'react';
// import { useNavigation } from '../../router';
// import { useBreakpoint } from '../../providers/BreakpointProvider';

// import { getURLFromType } from '../../utils';
import { Box, H3, systemPropTypes } from '../../../ui-kit';

function HorizontalCardListFeature(props = {}) {
  //   const router = useNavigation();
  //   const { responsive } = useBreakpoint();

  //   const handleActionPress = (action) => {
  //     router.push(getURLFromType(action.relatedNode));
  //   };

  return (
    <Box pb="l" backgroundColor="#323233" {...props}>
      <H3 mb="xs">{props.feature.title}</H3>
      {props.feature?.cards?.map((item, index) => (
        <Box key={index} width="200px" mr="16px">
          <img src={item.coverImage?.sources[0]?.uri} width="100%" />
        </Box>
      ))}
    </Box>
  );
}

HorizontalCardListFeature.propTypes = {
  ...systemPropTypes,
};

export default HorizontalCardListFeature;
