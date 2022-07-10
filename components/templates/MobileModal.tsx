import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

import Sheet from "react-modal-sheet";

interface MobileModalProps {
  children: ReactNode;
  onClose?: any;
  contentStyle?: any;
  closeFunction: any;
  isOpen: boolean;
}

const MobileModal: React.FC<MobileModalProps> = (props): JSX.Element => {
  useEffect(() => {
    if (typeof window != undefined) {
      document.querySelector("body")?.classList.add("modal-open");
    }
    return () => {
      document.querySelector("body")?.classList.remove("modal-open");
    };
  }, []);
  return (
    <CustomSheet
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      rootId="root"
      springConfig={{
        stiffness: 300,
        damping: 100,
        mass: 0.2,
      }}
    >
      <CustomSheet.Container>
        <CustomSheet.Header />
        <CustomSheet.Content>{props.children}</CustomSheet.Content>
      </CustomSheet.Container>

      <CustomSheet.Backdrop onTap={() => props.onClose()} />
    </CustomSheet>
  );
};

export default MobileModal;

const CustomSheet = styled(Sheet)`
  .react-modal-sheet-backdrop {
    /* custom styles */
  }
  .react-modal-sheet-container {
    height: auto !important;
  }
  .react-modal-sheet-content {
    margin-bottom: 30px;
  }
  .react-modal-sheet-backdrop {
    border: none;
    outline: none;
    background: rgb(1 1 1 / 27%) !important;
  }
`;
