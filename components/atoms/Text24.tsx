import { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../styled/theme";

interface Text24Props {
  color?: string;
  children: ReactNode;
}

interface Text24Style {
  color: string;
}

const Text24: React.FC<Text24Props> = ({
  color = "#fff",
  children,
}: Text24Props): JSX.Element => {
  return <Text24Wrapper color={color}>{children}</Text24Wrapper>;
};

export default Text24;

const Text24Wrapper = styled.p<Text24Style>`
  font-family: ${theme.fonts.kdam};
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 24px;
  line-height: 37px;
  @media ${theme.breakpoints.xs} {
    font-size: 18px;
    line-height: 27px;
  }
`;
