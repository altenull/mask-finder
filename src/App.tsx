import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { MaskFinderLogo } from './app/src/core/components';
import { MapProvider } from './app/src/core/contexts';
import { DevelopmentContainer } from './app/src/development/containers/Development.container';
import { MapContainer } from './app/src/map/containers/Map.container';
import { SearchContainer } from './app/src/search/containers/Search.container';
import { inlineColors, inlineFontWeights, inlineStyles } from './app/src/ui/inline-styles';
import { useScript } from './app/src/utils/hooks';

declare global {
  interface Window {
    kakao: any;
    overLaies: any;
    markers: any;
  }
}

// An issue that styles are not applied on page in production
// https://github.com/styled-components/styled-components/issues/2911#issuecomment-592012166
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: 'Noto Sans KR', Arial, sans-serif;
    font-weight: ${inlineFontWeights.light};
    font-size: 16px;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${inlineFontWeights.regular};
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    user-select: none;
  }

  #root {
    height: 100%;
  }
`;

const StdPageHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${inlineStyles.header.height};
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid ${inlineColors.gray1};
`;

const StdMaskFinderLogo = styled(MaskFinderLogo)`
  margin-right: 16px;
`;

const StdPageBody = styled.section`
  position: relative;
  display: block;
  width: 100%;
  height: calc(100% - ${inlineStyles.header.height});
`;

const App: React.FC = () => {
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);
  const [isKakaoMapScriptLoaded, kakaoMapScriptError] = useScript(
    '//dapi.kakao.com/v2/maps/sdk.js?appkey=fd6b4e1cfdb1be04fd09671bda9c3cff&libraries=services&autoload=false'
  );

  if (isKakaoMapScriptLoaded && !kakaoMapScriptError) {
    window.kakao.maps.load(() => {
      setIsKakaoMapLoaded(true);
    });
  }

  return (
    <>
      <GlobalStyle />
      <MapProvider>
        <StdPageHeader>
          <StdMaskFinderLogo />
          <SearchContainer />
        </StdPageHeader>
        <StdPageBody>
          {process.env.NODE_ENV === 'development' && <DevelopmentContainer />}
          {/* TODO: Show skeleton loading ui if kakao map is not ready */}
          {isKakaoMapLoaded && <MapContainer />}
        </StdPageBody>
      </MapProvider>
    </>
  );
};

export default App;
