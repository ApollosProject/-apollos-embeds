import React from 'react';
import { withTheme } from 'styled-components';
import { Check } from '@phosphor-icons/react';

import {SmallBodyText, Box, systemPropTypes, ProgressBar, Longform} from '../../ui-kit';
import {useHTMLContent, useVideoMediaProgress} from '../../hooks';
import { getPercentWatched } from '../../utils';
import { BottomSlot, CompleteIndicator, Title, Summary, ChannelLabel } from './ContentCard.styles';
import EventCalendar from "../../components/EventCalendar";

function ContentCard({
  videoMedia,
  image,
  title,
  subtitle,
  summary,
  htmlContent,
  start,
  end,
  location,
  channelLabel,
  horizontal,
  onClick,
  ...props
}) {
  const { userProgress, loading: videoProgressLoading } = useVideoMediaProgress({
    variables: { id: videoMedia?.id },
    skip: !videoMedia?.id,
  });
  const parseHTMLContent = useHTMLContent();
  const percentWatched = getPercentWatched({
    duration: videoMedia?.duration,
    userProgress,
  });

  return (
    <Box
      flex={1}
      cursor={onClick ? 'pointer' : 'default'}
      borderRadius="xl"
      overflow="hidden"
      backgroundColor="neutral.gray6"
      height="100%"
      display={horizontal ? 'flex' : ''}
      onClick={onClick}
      className="content-card"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick(e);
        }
      }}
      {...props}
    >
      <Box position="relative" width={horizontal ? '50%' : ''}>
        {/* Image */}
        <Box
          backgroundSize="cover"
          paddingBottom="56.25%"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundColor="material.regular"
          backgroundImage={`url(${image?.sources[0].uri ? image.sources[0].uri : null})`}
          height="100%"
        />
        {/* Progress / Completed Indicators */}
        <BottomSlot>
          {userProgress?.complete ? (
            <CompleteIndicator color="fill.paper" alignSelf="flex-end">
              <Check size={18} />
            </CompleteIndicator>
          ) : null}

          {percentWatched > 0 ? <ProgressBar percent={percentWatched} /> : null}
        </BottomSlot>
      </Box>
      {/* Masthead */}
      <Box padding="base" backdropFilter="blur(64px)" width={horizontal ? '50%' : ''}>
        {channelLabel ? <ChannelLabel color="text.secondary">{channelLabel}</ChannelLabel> : null}
        <SmallBodyText color="text.secondary">{subtitle}</SmallBodyText>
        <Title>{title}</Title>
        <Summary color="text.secondary">{summary} </Summary>
        {!!start || !!end || !!location ? (
          <Box display="flex" flexDirection={{ sm: 'row', xs: 'column' }} width="100%">
            <EventCalendar
              start={start}
              end={end}
              location={location}
            />
          </Box>
        ):null}

        {htmlContent && (
          <Longform
            dangerouslySetInnerHTML={{
              __html: parseHTMLContent(htmlContent),
            }}
          />
        )}
      </Box>
    </Box>
  );
}

ContentCard.propTypes = {
  ...systemPropTypes,
};

export default withTheme(ContentCard);
