import {useEffect, useState} from 'react';

function Shop() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.slippys.cool/dogs');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  });


  return (
    <div>
      <h1>Shop</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default Shop;
