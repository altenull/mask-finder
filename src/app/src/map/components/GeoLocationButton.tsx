import React from 'react';
import styled from 'styled-components';

import { LocationIcon } from '../../ui/icons';

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
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
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
