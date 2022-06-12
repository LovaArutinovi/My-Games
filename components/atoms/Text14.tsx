import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";
import theme from "../../styled/theme";

interface Text14Props {
  color?: string;
  children: ReactNode;
  textStyles?: CSSProperties;
}

interface Text14Style {
  color: string;
}

const Text14: React.FC<Text14Props> = ({
  color = "#818693",
  children,
  textStyles,
}: Text14Props): JSX.Element => {
  return (
    <Text14Wrapper color={color} style={textStyles}>
      {children}
    </Text14Wrapper>
  );
};

export default Text14;

const Text14Wrapper = styled.p<Text14Style>`
  font-family: ${theme.fonts.kdam};
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  @media ${theme.breakpoints.xs} {
    font-size: 12px;
    line-height: 18px;
  }
`;
