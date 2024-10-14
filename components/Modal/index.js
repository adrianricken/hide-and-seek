import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const ConfirmButton = styled.button`
  background-color: #ff6961;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;

  &:hover {
    background-color: #ff9a9a;
  }
`;

const CancelButton = styled.button`
  background-color: #cccccc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const Modal = ({ onConfirm, onCancel }) => (
  <ModalOverlay>
    <ModalContent>
      <h3>Are you sure?</h3>
      <p>
        Do you really want to delete this comment? This action cannot be undone.
      </p>
      <ModalButtonContainer>
        <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </ModalButtonContainer>
    </ModalContent>
  </ModalOverlay>
);

export default Modal;
