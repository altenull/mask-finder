import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import { inlineColors, inlineFontWeights, inlineStyles } from '../inline-styles';

// TODO: Refactor handleClick
interface ToggleButtonProps {
  items: string[];
  handleClick: any;
}

interface StdToggleButtonItemProps {
  isSelected: boolean;
  isFirstItem: boolean;
  isLastItem: boolean;
}

const StdToggleButton = styled.div`
  display: inline-flex;
  align-items: center;
  height: 40px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: ${inlineStyles.boxShadow.boxShadow2};
`;

const StdToggleButtonItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 0.875rem;
  font-weight: ${inlineFontWeights.regular};
  padding: 0 16px;
  cursor: pointer;
  border-radius: ${({ isFirstItem, isLastItem, ...rest }: StdToggleButtonItemProps) =>
    isFirstItem ? '4px 0 0 4px' : isLastItem ? '0 4px 4px 0' : 'initial'};
  color: ${({ isSelected, ...rest }: StdToggleButtonItemProps) => (isSelected ? '#ffffff' : inlineColors.gray4)};
  background-color: ${({ isSelected, ...rest }: StdToggleButtonItemProps) =>
    isSelected ? inlineColors.primary : '#ffffff'};
  transition: all 0.15s ease;
`;

const StdDividier = styled.span`
  min-width: 1px;
  height: calc(100% - 8px);
  background-color: ${inlineColors.gray2};
`;

export const ToggleButton: React.FC<ToggleButtonProps> = ({ items = [], handleClick }: ToggleButtonProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectToggleItem = (index: number) => {
    setSelectedIndex(index);
    handleClick(index);
  };

  const lastIndexOfItems: number = items.length - 1;
  const toggleButtonItems = items.map((toggleButtonItem: string, index: number) => (
    <Fragment key={index}>
      <StdToggleButtonItem
        isSelected={selectedIndex === index}
        isFirstItem={index === 0}
        isLastItem={index === lastIndexOfItems}
        onClick={() => selectToggleItem(index)}>
        {toggleButtonItem}
      </StdToggleButtonItem>
      {index < lastIndexOfItems && <StdDividier></StdDividier>}
    </Fragment>
  ));

  return <StdToggleButton>{toggleButtonItems}</StdToggleButton>;
};
