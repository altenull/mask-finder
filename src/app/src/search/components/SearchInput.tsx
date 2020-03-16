import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import { zIndex } from '../../ui/inline-styles';

interface Props {
  setKeyword: Dispatch<SetStateAction<string>>;
}

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
