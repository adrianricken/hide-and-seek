import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  width: calc(100% - 150px); /* Adjust width to leave space for the button */
  height: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 30px;
  border: 1px solid #bab7b6;
`;

export const StyledError = styled.p`
  color: red;
  font-size: 0.9rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const StyledButton = styled.button`
  background-color: #ffff;
  width: 5rem;
  height: 3rem;
  border: 1px solid #69af69;
  color: #69af69;
  border-radius: 2rem;

  &:hover {
    background-color: #a3d2a3;
  }
`;

export const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const Comment = styled.li`
  display: flex;
  justify-content: space-between; /* Space out children to fill the item */
  align-items: center; /* Align items vertically */
  margin-bottom: 1rem;
  background-color: #e8e3e1;
  padding: 20px; /* Add padding inside the border */
  border-radius: 30px;
  color: #336234;
  width: calc(100% - 150px);
  height: auto;
`;

export const StyledSmall = styled.small`
  color: #bab7b6;
`;

export const DeleteButton = styled.button`
  background-color: #ffff;
  border: none;
  width: 5rem;
  height: 2rem;
  border: 1px solid red;
  border-radius: 2rem;
  color: red;

  &:hover {
    background-color: #e3b6b3;
  }
`;

export const NoCommentsDiv = styled.div`
  display: flex;
  justify-content: center;
`;
