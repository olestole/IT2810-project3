import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, {useState, useEffect} from 'react';

const GET_PRODUCTS = gql`
  query Query {
    products {
      Varenavn
      Varetype
      Produsent
      Volum
      Pris
    }
  }
`;

const GET_START_PRODUCTS = gql`
  query Query($index: Int!) {
    startProducts(startIndex: $index) {
      Varenavn
      Varetype
      Produsent
      Volum
      Pris
    }
  }
`;

const TemporaryPLW = () => {
  const [index, setIndex] = useState<Number>(0)
  const [isFetching, setIsFetching] = useState<Boolean>(false);
  const { data, loading, error, fetchMore } = useQuery(GET_START_PRODUCTS, { variables: { index: index}});

  let loadMore = () => {
    fetchMore({
      variables: {
        index: data.startProducts.length
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          startProducts: [...prev.startProducts, ...fetchMoreResult.startProducts]
        });
      }
    }
    )
  }

  const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		console.log(isFetching);
	};

  useEffect(() => {
		window.addEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
		if (!isFetching) return;
    loadMore();
    setIsFetching(false);
	}, [isFetching]);

  if (loading) return <p>Loading ...</p>;
  
  if (data && data.startProducts) {
    console.log(data.startProducts);
  }

  return (
    <div>
      <h1>Products</h1>
      {data.startProducts.map((product: any) => (
        <div id={product.Varenavn}>
          <h3>{product.Varenavn}</h3>
          <h5>Varetype: {product.Varetype}, Produsent: {product.Produsent}, Volum: {product.Volum}, Pris: {product.Pris}</h5>
        </div>
      ))}
    </div>
  );
};

export default TemporaryPLW;