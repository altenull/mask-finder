import React from 'react';
import styled from 'styled-components';

import logoImage from '../../../assets/images/core/logo.png';

interface MaskFinderLogoProps {
  className?: string;
}

const StdLogo = styled.img`
  width: auto;
  height: 40px;
`;

export const MaskFinderLogo: React.FC<MaskFinderLogoProps> = ({ className }: MaskFinderLogoProps) => {
  return <StdLogo src={logoImage} className={className} />;
};
