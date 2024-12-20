import React, { useState, useContext, useEffect } from 'react';
import Post from './post_list';
import MyContext from "../context/createContext";
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { loading, conts, createstock, fetchstocks } = useContext(MyContext);
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    stockname: '',
    ticker: '',
    quantity: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createstock(formdata).then(() => {
      fetchstocks(); 
      setformdata({ stockname: '', ticker: '', quantity: '', price: '' }); 
    });
  };

  useEffect(() => {
    fetchstocks();
  }, [fetchstocks]);

  return (
    <div className='flex flex-col lg:flex-row w-full'>
      <div className="w-full h-screen lg:w-2/6 bg-gradient-to-r from-orange-400 to-orange-500 p-5 text-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Add Stocks</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-lg font-medium">Stock Name</label>
            <input
              className="w-full p-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              name="stockname"
              value={formdata.stockname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Ticker</label>
            <input
              className="w-full p-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              name="ticker"
              value={formdata.ticker}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Quantity</label>
            <input
              className="w-full p-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="number"
              name="quantity"
              value={formdata.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Buy Price</label>
            <input
              className="w-full p-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="number"
              name="price"
              value={formdata.price}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-orange-500 hover:to-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        <div className="dashboard-btn mt-20 p-4 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg shadow-lg hover:from-gray-500 hover:to-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      <div className="w-full lg:w-4/6 p-5">
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <ArrowPathIcon className="animate-spin w-6 h-6" />
          </div>
        ) : conts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {conts.map((item) => (
              <Post key={item._id} post={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500 mt-20">No stocks listed</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
