import { ReactNode } from "react";
import styled from "styled-components";
import theme from "../../styled/theme";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  onClick: any;
}

const ButtonIcon: React.FC<ButtonProps> = ({
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
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="#0049FF"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.75 8C12.7504 9.03092 12.3967 10.0307 11.7483 10.8321C11.0998 11.6336 10.1958 12.188 9.1875 12.4028C8.17921 12.6176 7.12773 12.4796 6.20895 12.012C5.29017 11.5445 4.5598 10.7756 4.14 9.834L2.749 10.399C3.30042 11.6625 4.27003 12.6975 5.49482 13.3302C6.7196 13.9629 8.12488 14.1546 9.47438 13.8731C10.8239 13.5916 12.0353 12.8541 12.905 11.7845C13.7747 10.715 14.2497 9.37855 14.25 8C14.2501 6.74773 13.8583 5.52683 13.1296 4.5084C12.4009 3.48996 11.3719 2.72505 10.1866 2.32085C9.00138 1.91666 7.71937 1.89344 6.52027 2.25446C5.32117 2.61547 4.26508 3.34262 3.5 4.334V2.5H2V6.5L2.75 7.25H6.25V5.75H4.352C4.84711 4.89167 5.61167 4.22076 6.52705 3.84137C7.44243 3.46198 8.45744 3.39533 9.41457 3.65177C10.3717 3.9082 11.2174 4.47338 11.8205 5.2596C12.4236 6.04582 12.7503 7.00911 12.75 8Z"
        />
      </svg>
      {children}
    </ButtonWrapper>
  );
};

export default ButtonIcon;

const ButtonWrapper = styled(motion.div)`
  width: 144px;
  display: flex;
  gap: 15px;
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
    & svg {
      fill: ${theme.colors.white};
    }
  }
`;
