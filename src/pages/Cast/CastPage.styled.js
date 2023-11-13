import styled from 'styled-components';
export const WrapperCard = styled.li`
  display: flex;
  flex-wrap: wrap;
  /* gap: 50px;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px; */
  flex-basis: calc((100% - 30px) / 4);
  /* gap: 10px; */
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  list-style: none;
`;
export const Wrapper = styled.ul`
  display: flex;

  flex-wrap: wrap;

  padding: 0;
`;
