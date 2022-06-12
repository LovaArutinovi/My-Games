import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";
import theme from "../../styled/theme";

interface Text18Props {
  color?: string;
  children: ReactNode;
  textStyles?: CSSProperties;
}

interface Text18Style {
  color: string;
}

const Text18: React.FC<Text18Props> = ({
  color = "#fff",
  children,
  textStyles,
}: Text18Props): JSX.Element => {
  return (
    <Text18Wrapper color={color} style={textStyles}>
      {children}
    </Text18Wrapper>
  );
};

export default Text18;

const Text18Wrapper = styled.p<Text18Style>`
  font-family: ${theme.fonts.kdam};
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  @media ${theme.breakpoints.xs} {
    font-size: 14px;
    line-height: 21px;
  }
`;
