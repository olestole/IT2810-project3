import React from 'react';
import { makeQuery } from 'utils/api';

const Detail = () => {
  const fetchInfo = async () => {
    const res = await makeQuery();
    console.log(res.data);
  };

  return (
    <div>
      <h1>Detail</h1>
      <button onClick={fetchInfo}>Hent info</button>
    </div>
  );
};

export default Detail;
