import styled from "styled-components";
import { neutral } from "../utils";
import { BasicButton } from "./Buttons";
import { Modal } from "./Modal";

const MainContainer = styled.div`
  background-color: white;
  padding: 2rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const TextArea = styled.textarea`
  border: 2px solid ${neutral[300]};
  padding: 1rem;
  width: 100%;
  height: 100px;
  font-size: 12px;
  border-radius: 5px;
`;

const Title = styled.h3``;

export const BasicDialogue = ({
  title,
  onClose,
  onCopy,
  inviteText = "Test",
}) => {
  return (
    <Modal>
      <MainContainer>
        <Title>{title}</Title>
        <TextArea readOnly value={inviteText} />
        <ButtonContainer>
          <BasicButton onClick={onCopy}>Copy</BasicButton>
          <BasicButton onClick={onClose}>Close</BasicButton>
        </ButtonContainer>
      </MainContainer>
    </Modal>
  );
};
