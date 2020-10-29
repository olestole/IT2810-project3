import React from 'react';
import {render, fireEvent, RenderResult, cleanup, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
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
import Detail, { GET_SINGLE_PRODUCT } from 'pages/Detail'

let documentBody: RenderResult;

afterEach(cleanup)


describe('Logo', () => {
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
        Varenavn: "Dom perignon Brut 2010",
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
  }
}]

describe('graphql query', () => {
  it('get single product', async () => {
    const { findByText, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <MockedProvider mocks={mocks} addTypename={false}>
          <Detail />
         </MockedProvider>
        </Provider>
      </BrowserRouter>
   )
    
    const itemName = await findByText("Dom perignon Brut 2010");
    expect(itemName).toBeInTheDocument();
  })
})





describe('App', () => {
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

