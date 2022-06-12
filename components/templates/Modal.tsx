import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styled/theme";
import { motion } from "framer-motion";

interface ModalProps {
  children: ReactNode;
  onClose?: any;
  contentStyle?: any;
  closeFunction: any;
}

interface BasicProps {
  active?: boolean;
  isMobile?: boolean;
}
const container = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
    },
  },
};

const Modal: React.FC<ModalProps> = (props): JSX.Element => {
  useEffect(() => {
    if (typeof window != undefined) {
      document.querySelector("body")?.classList.add("modal-open");
    }
    return () => {
      document.querySelector("body")?.classList.remove("modal-open");
    };
  }, []);
  return (
    <ModalBox>
      <ModalCloseBg
        onClick={(e) => {
          props.onClose();
          //  setModalOpen(false);
          props.closeFunction(false);
          e.stopPropagation();
        }}
      ></ModalCloseBg>
      <ModalBody
        variants={container}
        initial="hidden"
        animate="show"
        style={props.contentStyle ?? {}}
      >
        {props.children}
      </ModalBody>
    </ModalBox>
  );
};

export default Modal;

const ModalBox = styled.div<BasicProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s;
`;
const ModalCloseBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  cursor: pointer;
  background: ${theme.colors.black};
  opacity: 0.2;
  z-index: -1;
`;
const ModalBody = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 50px;
  background: #ffffff;
  border-radius: 30px;
  z-index: 2;
  /* transform: scale(0.5); */
`;
