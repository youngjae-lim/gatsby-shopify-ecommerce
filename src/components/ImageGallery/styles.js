import styled from 'styled-components';

export const ImageGalleryWrapper = styled.section`
  > div:first-child {
    border: 2px solid #ccc;
  }

  > div:last-child {
    margin-top: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
