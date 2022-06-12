import { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../styled/theme";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  onClick: any;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <ButtonWrapper
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        default: { duration: 0 },
      }}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled(motion.div)`
  width: 144px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: ${theme.fonts.kdam};
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: ${theme.colors.blue};

  border: 1px solid ${theme.colors.blue};
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: ${theme.colors.blue};
    color: ${theme.colors.white};
    box-shadow: 0px 5px 10px rgba(0, 73, 255, 0.2);
  }
`;
