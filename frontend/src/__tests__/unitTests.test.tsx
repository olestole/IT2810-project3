import React from 'react';
import {render, fireEvent, RenderResult, cleanup, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { store } from 'store/reducer';
import { Logo, Header, Search } from 'components/Shared'
import { BrowserRouter} from 'react-router-dom';
import Router from 'pages/Router';
import { CustomToastContainer } from 'components/Shared/FeedbackToast';
import ApolloWrapper from 'utils/ApolloWrapper';
import { createMemoryHistory } from 'history';
import * as actions from 'store/action';
import { MockedProvider } from '@apollo/client/testing'
import Detail from 'pages/Detail'
import { GET_SINGLE_PRODUCT, GET_REVIEWS } from 'graphql/queries';

let documentBody: RenderResult;

afterEach(cleanup)

//testing logo component with user event (homeclick)
describe('logo', () => {
  beforeEach(() => {
    documentBody = render(<ApolloWrapper>
      <BrowserRouter>
        <Provider store={store}>
          <CustomToastContainer />
          <Logo />
          <Router />
        </Provider>
      </BrowserRouter>
    </ApolloWrapper>
  )})

  it('renders correctly', () => {
        expect(documentBody.getByRole('title')).toBeTruthy()
        expect(documentBody.getByRole('image')).toBeTruthy()
  })

  it('shows title of page', () => {
    expect(documentBody.getByText("WineEncyclopedia")).toBeInTheDocument()
  })

  it('handle home click', () => {
    const { getByRole } = documentBody
    const history = createMemoryHistory()

    fireEvent.click(getByRole('homeButton'));

    expect(history.location.pathname).toBe('/')
  })

  it('matches snapshot', () => {
    expect(documentBody).toMatchSnapshot()
  })

});


//Testing search component with user event (search input and function)
describe('search', () => {
  beforeEach(() => {
    documentBody = render(<ApolloWrapper>
      <BrowserRouter>
        <Provider store={store}>
          <CustomToastContainer />
          <Search />
        </Provider>
      </BrowserRouter>
    </ApolloWrapper>
  )})


  it('renders correctly', () => {
    expect(documentBody.getByLabelText('searchIcon')).toBeTruthy()
    expect(documentBody.getByPlaceholderText('Produkt…')).toBeTruthy()
  })

  it('shows chip when search', () => {
    fireEvent.change(documentBody.getByPlaceholderText('Produkt…'), { target: { value: "whiskey" } })
    fireEvent.keyDown(documentBody.getByPlaceholderText('Produkt…'), { key: 'Enter', keyCode: 13, charCode: 13 })

    expect(documentBody.getByRole('chip')).toHaveTextContent('whiskey');
  })
});


//Testing actions from store
describe('actions', () => {
  it('should set search string', () => {
    const text = 'whiskey'
    const expectedAction = {
      type: 'SET_SEARCH_TEXT',
      payload: text
    }
    expect(actions.setSearchText(text)).toEqual(expectedAction)
  })

  it('should set filtermode', () => {
    const boolean = true
    const expectedAction = {
      type: 'FILTER_MODE',
      payload: boolean
    }
    expect(actions.setFilterMode(boolean)).toEqual(expectedAction)
  })
})

//Mocks for mocking the two graphql queries GET_SINGLE_PRODUCT and GET_REVIEWS
const mocks= [{
  request: {
    query: GET_SINGLE_PRODUCT,
    variables: {
      number: location.pathname.substr(1)
    }
  },
  result: {
    data: {
      singleProduct: {
        Varenummer: "232101",
        Varenavn: "Dom Perignon Brut 2010",
        Volum: "0.75",
        Pris: "1649.9",
        Varetype: "Champagne, brut",
        Farge: "Middels dyp grønngul.",
        Lukt: "Fokusert aroma av eple og sitrus, litt blomst og steinfrukt over innslag av kjeks og mineraler.",
        Smak: "Litt utviklet, kremet og frisk, preg av eple, sitrus, mineraler, nøtt og kjeks. Lang ettersmak.",
        Land: "Frankrike",
        Produsent: "Moët & Chandon",
      }
    }
  },

},
{
  request: {
    query: GET_REVIEWS,
    variables: {
      reviewsVarenummer: "232101"
    },
    fetchPolicy: 'network-only',
  }, 
  result: {
    data: {
      reviews: [
        {
          userEmail: "oleastole@gmail.com",
          varenummer: "232101",
          title: "Nydelig guttastemning",
          description: "Drakk denne på fest og ble damenes midtpunkt på en, to, tre! Anbefales\n\n-Henrik Gundersen (23, Holmenkollen)",
          rating: 5
        }
      ]
    }
  }
}]

//Test for testing graphql queries with the mocks from above
describe('graphql queries', () => {
  it('get single product with user reviews', async () => {
    const { findByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
          <Detail />
         </MockedProvider>
        </Provider>
      </BrowserRouter>
   )
    expect(getByRole("loading")).toBeInTheDocument();
    
    const itemName = await findByText("Dom Perignon Brut 2010");
    const title = await findByText("Nydelig guttastemning");
    expect(itemName).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  })
})



//Snapshot test for the app
describe('app', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ApolloWrapper>
      <BrowserRouter>
        <Provider store={store}>
          <CustomToastContainer />
          <Header />
          <Router />
        </Provider>
      </BrowserRouter>
    </ApolloWrapper>)

    expect(asFragment).toMatchSnapshot()
  })
});

