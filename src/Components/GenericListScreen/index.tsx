import {
  Main,
  Container,
  Title,
  Search,
  ContentBox,
  Header,
  List,
  ButtonDiv,
  DropDiv,
} from './Style';
import SearchInput from '../SearchInput';
import RedirectListButton from '../RedirectButton';

const GenericListScreen = ({
  ButtonTitle,
  ButtonFunction,
  PageTitle,
  children,
  setWord,
  SearchWord,
  ListType,
  redirectTo,
  clientList,
}: any) => (
  <Main>
    <Container>
      <Title>{PageTitle}</Title>
      <Header>
        <DropDiv>
          <Search>
            <SearchInput
              type="text"
              // icon={<FaSistrix />}
              value={SearchWord}
              setWord={(value: any) => setWord(value)}
            />
          </Search>
          {children[1]}
          {clientList && children[2]}
        </DropDiv>
        <ButtonDiv>
          <RedirectListButton
            title={ButtonTitle}
            redirectTo={redirectTo}
            click={ButtonFunction}
          />
        </ButtonDiv>
      </Header>

      <ContentBox>
        {children[0]}
        <List>{ListType}</List>
      </ContentBox>
    </Container>
  </Main>
);

export default GenericListScreen;
