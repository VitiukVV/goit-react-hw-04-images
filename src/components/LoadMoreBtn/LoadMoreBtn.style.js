import { styled } from 'styled-components';

export const LoadMore = styled.button`
  color: white;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  width: 165px;
  padding: 8px 24px;
  gap: 16px;
  font-weight: 500;
  font-size: 16px;
  line-height: calc(24 / 16);
  letter-spacing: 0.04em;
  border: transparent;
  background: #4d5ae5;
  border-radius: 4px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  :focus {
    background-color: #303f9f;
  }
`;
