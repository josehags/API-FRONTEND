import styled from 'styled-components';
import colors from '../../Constants/colors';

export const PersonDataBox = styled.div`
  width: 100%;
  height: 10%;
  font-size: 1vh;
  background-color: ${colors.secondary};
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1vh;
  border-radius: 8px;
  overflow: auto;
  @media (max-width: 750px) {
    width: 85%;
    height: 40%;
    margin: 0 auto;
    margin-bottom: 2vh;
    display: flex;
    flex-direction: row;
  }
`;

export const TableContent = styled.div`
  display: flex;
  justify-content: center;
  width: ${props => `${props.width}%`};
  text-align: center;
  align-items: center;
  margin: 0 10px 0 10px;
  overflow: auto;
  @media (max-width: 750px) {
    width: 100%;
    height: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    word-break: break-all;
    margin-top: 2%;
  }
`;

export const TableContainer = styled.div`
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    margin-bottom: 0;
    padding: 2vh;
  }
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const P = styled.p`
  font-size: 2vh;
  margin-block-end: 0;
  margin-block-start: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Montserrat;
  @media (max-width: 750px) {
    font-size: 2.5vh;
    font-weight: 900;
    align-items: center;
    margin-left: 1vw;
  }
`;

export const Name = styled(P)`
  border-radius: 12px;
  padding: 2%;
  text-align: center;
  font-family: Montserrat;
  color: ${colors.secondary};
  background-color: ${props => `${props.color}`};
`;

export const Box = styled.div`
  background-color: #fff;
  border: 1px solid black;
  border-radius: 12px;
  position: absolute;
  width: 15vh;
  right: 0;
  top: 65%;
  z-index: 1;
  @media (max-width: 750px) {
    top: 15%;
    width: 10vh;
  }
`;

export const ImageUser = styled.div`
  width: 3vw;
  height: 100%;
  margin-left: 0.5rem;
  @media (max-width: 750px) {
    width: 30%;
    padding: 2%;
    height: 50vh;
    margin-left: 0;
    background-color: ${colors.primary};
  }
`;

export const Ul = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
  margin: 0;
`;

export const Content = styled.div`
  position: relative;
`;

export const DotContent = styled.div`
  display: flex;
  justify-content: center;
  width: ${props => `${props.width}%`};
  margin: 10px;
  overflow: auto;
  @media (max-width: 750px) {
    position: absolute;
    top: 5%;
    right: 15%;
    width: fit-content;
  }
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 0 0 1px;
  align-content: center;
  justify-content: center;
  @media (max-width: 750px) {
    width: 100%;
    height: 40%;
    padding: 2% 0 0 0;
    margin: 4% 0 0 0;
  }
`;
