import styled from "styled-components";
import MainContainer from "../layout/MainContainer";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <MainContainer></MainContainer>
      </HeaderContent>
      <HeaderButtonWrapper>
        <MainContainer>
          <HeaderButton>
            <img src="/icons/menu.svg" alt="menu" />
          </HeaderButton>
        </MainContainer>
      </HeaderButtonWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header``;

const HeaderContent = styled.div``;
const HeaderButtonWrapper = styled.div`
  padding: 30px 0;
`;
const HeaderButton = styled.div`
  cursor: pointer;
`;
