import styled from 'styled-components';
import colors from '../../Constants/colors';

const Button = styled.button`
  font-family: Montserrat;
  font-size: 3vh;
  color: ${colors.secondary};
  width: 105%;
  height: 100%;
  background-color: ${colors.primary};
  border-radius: 1vw;
  border: 2% solid ${colors.primary};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  float: right;
  text-decoration-line: none;
  padding: 0% 2% 0% 2%;

  @media (max-width: 750px) {
    text-align: center;
    border-radius: 40vw;
    width: 100%;
  }
`;

export default Button;
