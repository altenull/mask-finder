import React, { useContext } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextState } from '../../core/contexts';
import { inlineZIndex } from '../../ui/inline-styles';

const StdDevelopmentPositioner = styled.div`
  position: absolute;
  left: 8px;
  bottom: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 8px;
  z-index: ${inlineZIndex.development};
`;

export const DevelopmentContainer: React.FC = () => {
  const { mapCoordinates }: MapContextState = useContext(MapContext);

  return (
    <StdDevelopmentPositioner>
      Lat: {mapCoordinates.latitude} Lng: {mapCoordinates.longitude}
    </StdDevelopmentPositioner>
  );
};
