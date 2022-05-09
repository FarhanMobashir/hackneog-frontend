import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const modalRoot = document.getElementById("modal");

const ModalWrapper = styled.div`
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.789);
  width: 100%;
  height: 100%;
`;

export const Modal = ({ children }) => {
  const elementRef = React.useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }
  React.useEffect(() => {
    modalRoot.appendChild(elementRef.current);
    return () => modalRoot.removeChild(elementRef.current);
  }, []);
  // top level element needs to be single element
  return createPortal(
    <ModalWrapper>{children}</ModalWrapper>,
    elementRef.current
  );
};
