import colors from '../../Constants/colors';

export type PersonDataBox = `
  width: 100%;
  height: 10%;
  font-size: 1vh;
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

export type TableContent = `
  display: flex;
  justify-content: center;
 
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

export type TableContainer = `
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

export type P = `
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

export type Name = `
  border-radius: 12px;
  padding: 2%;
  text-align: center;
  font-family: Montserrat;

`;

export type Box = `
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

export type ImageUser = `
  width: 3vw;
  height: 100%;
  margin-left: 0.5rem;
  @media (max-width: 750px) {
    width: 30%;
    padding: 2%;
    height: 50vh;
    margin-left: 0;
  }
`;

export type Ul = `
  list-style-type: none;
  padding-inline-start: 0;
  margin: 0;
`;

export type Content = `
  position: relative;
`;

export type DotContent = `
  display: flex;
  justify-content: center;
  margin: 10px;
  overflow: auto;
  @media (max-width: 750px) {
    position: absolute;
    top: 5%;
    right: 15%;
    width: fit-content;
  }
`;

// export const Img = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   margin: 0 0 0 1px;
//   align-content: center;
//   justify-content: center;
//   @media (max-width: 750px) {
//     width: 100%;
//     height: 40%;
//     padding: 2% 0 0 0;
//     margin: 4% 0 0 0;
//   }
// `;
