import React, { useState } from 'react';
import styled from 'styled-components';

import { inlineColors, inlineStyles } from '../inline-styles';

interface ToggleButtonProps {
  items: string[];
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
  padding: 0 16px;
  cursor: pointer;
  border-radius: ${(props: StdToggleButtonItemProps) =>
    props.isFirstItem ? '4px 0 0 4px' : props.isLastItem ? '0 4px 4px 0' : 'initial'};
  color: ${(props: StdToggleButtonItemProps) => (props.isSelected ? '#ffffff' : inlineColors.gray4)};
  background-color: ${(props: StdToggleButtonItemProps) => (props.isSelected ? inlineColors.primary : '#ffffff')};
  transition: all 0.15s ease;
`;

const StdDividier = styled.span`
  min-width: 1px;
  height: calc(100% - 8px);
  background-color: ${inlineColors.gray2};
`;

export const ToggleButton: React.FC<ToggleButtonProps> = ({ items = [] }: ToggleButtonProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const lastIndexOfItems: number = items.length - 1;
  const toggleButtonItems = items.map((toggleButtonItem: string, index: number) => (
    <>
      <StdToggleButtonItem
        key={index}
        isSelected={selectedIndex === index}
        isFirstItem={index === 0}
        isLastItem={index === lastIndexOfItems}
        onClick={() => setSelectedIndex(index)}>
        {toggleButtonItem}
      </StdToggleButtonItem>
      {index < lastIndexOfItems && <StdDividier></StdDividier>}
    </>
  ));

  return <StdToggleButton>{toggleButtonItems}</StdToggleButton>;
};
