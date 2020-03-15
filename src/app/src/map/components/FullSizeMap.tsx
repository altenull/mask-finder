import React from 'react';
import styled from 'styled-components';

import { FULL_SIZE_MAP_ID } from '../variables/map.variables';

const StdFullSizeMap = styled.div`
  width: 100%;
  height: 100%;
`;

export const FullSizeMap: React.FC = () => {
  return <StdFullSizeMap id={FULL_SIZE_MAP_ID} />;
};
