import React from 'react';
import CenterContentBox from '../CenterContentBox';
import { CircularProgress, type BoxProps } from '@mui/material';

interface Props extends BoxProps {
  progressSize?: number;
  ensureMinWindowHeight?: boolean;
  color?: BoxProps['color'];
}

const CenteredLoader: React.FC<Props> = ({
  minHeight,
  progressSize,
  ensureMinWindowHeight = false,
  color,
  ...otherProps
}) => {
  return (
    <CenterContentBox
      {...otherProps}
      minHeight={ensureMinWindowHeight ? '100%' : minHeight}
      color={color || 'error.main'}
    >
      <CircularProgress color="inherit" size={progressSize} />
    </CenterContentBox>
  );
};

export default CenteredLoader;
