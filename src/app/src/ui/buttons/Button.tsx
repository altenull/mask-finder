import React from 'react';
import styled from 'styled-components';

import { inlineColors } from '../inline-styles';

interface ButtonProps {
  isSelected: boolean;
  buttonText: string;
}

interface StdButtonProps {
  isSelected: boolean;
}

const StdButton = styled.button`
  display: inline-block;
  text-align: center;
  font-size: 0.875rem;
  padding: 10px 20px;
  line-height: 1.5;
  border-radius: 4px;
  user-select: none;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: ${(props: StdButtonProps) => (props.isSelected ? inlineColors.primary : '#ffffff')};
  color: ${(props: StdButtonProps) => (props.isSelected ? '#ffffff' : inlineColors.gray4)};
  transition: all 0.15s ease;
`;

export const Button: React.FC<ButtonProps> = ({ isSelected = false, buttonText = '' }: ButtonProps) => {
  return <StdButton isSelected={isSelected}>{buttonText}</StdButton>;
};
