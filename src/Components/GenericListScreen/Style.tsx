import styled from 'styled-components';
import colors from '../../Constants/colors';

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background-color: ${colors.background};
  width: 100vw;
  height: 100vh;
  @media (max-width: 750px) {
    height: max-content;
  }
`;

export const Container = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  margin-top: 5%;

  @media (max-width: 750px) {
    height: 100vh;
    margin-top: 0%;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 750px) {
    height: max-content;
    width: 85%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    justify-self: center;
    align-self: center;
  }
`;

export const Title = styled.h2`
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 4vh;
  margin: 0;
  margin-bottom: 7vh;

  @media (max-width: 750px) {
    width: 25%;
    margin-top: 10vh;
    margin-bottom: 1vh;
  }
`;

export const ButtonDiv = styled.div`
  float: right;
  width: 150px;
  height: 50px;
  border-radius: 15px;

  @media (max-width: 750px) {
    width: 50%;
    height: 100%;
    float: none;
    margin-left: 10px;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  height: 45%;
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin: 1% auto;
  overflow: hidden;

  @media (max-width: 750px) {
    width: 100%;
    height: max-content;
    box-sizing: border-box;
    border-radius: 0.5rem;
    margin-top: 20px;
    margin: 1% auto;
    overflow: auto;
  }
`;

export const Search = styled.div`
  float: left;
  height: 50px;

  @media (max-width: 750px) {
    width: 50%;
  }
`;

export const TableHeader = styled.div`
  background-color: ${colors.navHeaders};
  color: ${colors.secondary};
  height: 5vh;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 750px) {
    visibility: hidden;
  }
`;

export const P = styled.div`
  color: ${colors.secondary};
  font-size: 2vh;

  @media (max-width: 750px) {
    font-size: 1.6vh;
  }
`;

export const Bar = styled.div`
  width: 0.05%;
  height: 35%;
  border-radius: 3px;
  background-color: ${colors.secondary};
`;

export const TableTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const List = styled.div`
  height: 50vh;
  padding: 5px;
  overflow: auto;

  @media (max-width: 750px) {
    height: max-content;
    padding: 5px;
    overflow: auto;
  }
`;

export const DropDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 750px) {
    height: max-content;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;
