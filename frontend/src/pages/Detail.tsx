import React from 'react';
import { DetailView } from 'components/Detail';
import { gql, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { decrement, increment } from 'store/action';
import { AppState } from 'store/types';
import LoadingIndicator from 'components/Shared/LoadingIndicator';

// const GET_WHITE_WINES = gql`
//   query Query {
//     whiteWines {
//       Varenavn
//       Land
//       Distrikt
//     }
//   }
// `;

const GET_SINGLE_PRODUCT = gql`
  query Query($number: String!) {
    singleProduct(productNumber: $number) {
      Varenummer
      Varenavn
      Volum
      Pris
      Varetype
      Farge
      Lukt
      Smak
      Land
      Produsent
    }
  }
`;

const activeFilters = {
  redWine: true,
  minPrice: 400,
  maxPrice: 700,
};

const Detail = () => {
  /*if (error) return console.log(error);*/

  const location = useLocation();
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, { variables: { number: location.pathname.substr(1) } });

  // REDUX BELOW
  const dispatch = useDispatch();
  const count: number = useSelector((state: AppState) => state.count);

  const dispatchIncrement = (e: any) => {
    e.preventDefault();
    dispatch(increment());
  };
  const dispatchDecrement = (e: any) => {
    e.preventDefault();
    dispatch(decrement());
  };
  // REDUX ABOVE

  //useLazyQuery return a function which can be used to trigger the query manually and we should use this for dynamic loading
  if (loading)
    return (
      <div className="loadingIndicator">
        <LoadingIndicator />
      </div>
    );

  if (data && data.singleProduct) {
    console.log(data.singleProduct);
  }

  console.log(data.singleProduct);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={dispatchIncrement}>INCREMENT</button>
      <button onClick={dispatchDecrement}>DECREMENT</button>
      <DetailView product={data.singleProduct} />
    </div>
  );
};

export default Detail;
