import styled from "styled-components";
import theme from "../../styled/theme";
import Text14 from "../atoms/Text14";
import MainContainer from "../layout/MainContainer";

const Footer = () => {
  return (
    <FooterWrapper>
      <MainContainer>
        <FooterInner>
          <Text14>
            Create by{" "}
            <TextLink href="https://www.youtube.com/c/LOVAAR" target="_blank">
              Lova
            </TextLink>
          </Text14>
          <Text14>
            Idea from{" "}
            <TextLink href="https://monkeytype.com/" target="_blank">
              link
            </TextLink>
          </Text14>
        </FooterInner>
      </MainContainer>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  padding: 38px 0;
  background: ${theme.colors.black};
`;

const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TextLink = styled.a`
  text-decoration: underline;
`;
