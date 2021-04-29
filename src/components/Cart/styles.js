import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

export const CartWrapper = styled(StyledLink).attrs(() => ({
  to: '/cart',
}))`
  display: flex;
  color: black;
  text-decoration: none;
  padding: 10px 2px;

  > svg {
    margin: auto 0;
  }

  > div:last-child {
    padding-left: 8px;
    margin: auto 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;
