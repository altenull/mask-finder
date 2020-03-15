import React from 'react';
import styled from 'styled-components';

import { zIndex } from '../../ui/inline-styles';

const StdSearchInput = styled.input`
  position: absolute;
  left: 40px;
  top: 40px;
  width: 320px;
  height: 48px;
  font-size: 24px;
  padding: 12px;
  border: 1px solid #bdbdbd;
  z-index: ${zIndex.searchInput};
`;

export const SearchInput: React.FC = () => {
  return <StdSearchInput />;
};
