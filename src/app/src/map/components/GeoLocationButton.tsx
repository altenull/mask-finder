import React from 'react';
import styled from 'styled-components';

import { LocationIcon } from '../../ui/icons';
import { inlineStyles } from '../../ui/inline-styles';

interface GeoLocationButtonProps {
  className?: string;
  handleClick: () => void;
}

const StdButtonWrapper = styled.button`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  box-shadow: ${inlineStyles.boxShadow.boxShadow2};
`;

export const GeoLocationButton: React.FC<GeoLocationButtonProps> = ({
  className,
  handleClick,
}: GeoLocationButtonProps) => {
  return (
    <StdButtonWrapper className={className} title={'현위치'} onClick={() => handleClick()}>
      <LocationIcon></LocationIcon>
    </StdButtonWrapper>
  );
};
