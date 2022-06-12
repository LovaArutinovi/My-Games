import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styled/theme";

interface Text24Props {
  text: string;
  count: number;
  animate: number;
  seconds?: boolean;
}

interface Text24Style {
  active?: boolean;
}

const Text24Animated: React.FC<Text24Props> = ({
  text,
  count,
  animate,
  seconds,
}: Text24Props): JSX.Element => {
  const [animateScore, setAnimateScore] = useState<boolean>(false);
  useEffect(() => {
    if (animate) {
      setAnimateScore(true);
      setTimeout(() => setAnimateScore(false), 100);
    }
  }, [animate]);

  return (
    <Text24Wrapper>
      {text}:{" "}
      <Text24Score active={animateScore}>
        {count}
        {seconds && "s"}
      </Text24Score>
    </Text24Wrapper>
  );
};

export default Text24Animated;

const Text24Wrapper = styled.p`
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
const Text24Score = styled.span<Text24Style>`
  display: inline-block;
  transition: all 0.2s;
  ${(props) => (props.active ? "transform: scale(1.5);color:#0BFE06;" : "")}
`;
