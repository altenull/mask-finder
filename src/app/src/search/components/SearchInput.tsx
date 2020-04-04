import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { SearchIcon } from '../../ui/icons';
import { inlineColors, inlineZIndex } from '../../ui/inline-styles';

interface Props {
  setKeyword: Dispatch<SetStateAction<string>>;
}

const StdSearchInputWrapper = styled.div`
  position: relative;
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
`;

const StdSearchInput = styled.input`
  position: relative;
  width: 320px;
  height: 40px;
  font-size: 16px;
  padding: 12px 40px 12px 12px;
  outline: none;
  border-radius: 4px;
  border: 1px solid ${inlineColors.gray2};
  z-index: ${inlineZIndex.searchInput};
  &:focus {
    border: 1px solid ${inlineColors.primary};
  }
`;

const StdIconPositioner = styled.i`
  position: absolute;
  right: 8px;
  top: 10px;
  z-index: ${inlineZIndex.searchInputIcon};
`;

export const SearchInput: React.FC<Props> = ({ setKeyword }: Props) => {
  const [value, setValue] = useState<string>('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setKeyword(value);
    }
  };

  return (
    <StdSearchInputWrapper>
      <StdSearchInput type={'text'} placeholder={'검색...'} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
      <StdIconPositioner>
        <SearchIcon />
      </StdIconPositioner>
    </StdSearchInputWrapper>
  );
};
