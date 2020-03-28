import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { inlineZIndex } from '../../ui/inline-styles';

interface Props {
  setKeyword: Dispatch<SetStateAction<string>>;
}

const StdSearchInput = styled.input`
  position: relative;
  width: 320px;
  height: 40px;
  font-size: 16px;
  padding: 12px;
  border: 1px solid #bdbdbd;
  z-index: ${inlineZIndex.searchInput};
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

  return <StdSearchInput type={'text'} placeholder={'검색...'} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />;
};
