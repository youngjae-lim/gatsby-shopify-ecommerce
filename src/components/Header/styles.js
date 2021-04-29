import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media(min-width: 560px) {
    justify-content: space-between;
  }
`;
