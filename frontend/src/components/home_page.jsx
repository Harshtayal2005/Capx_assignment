import React from 'react'
import Post from './post_list';
import { useContext ,useEffect,useState} from "react";
import MyContext from "../context/createContext";
import { ArrowPathIcon} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function home_page() {

  const {loading,conts,createstock,fetchstocks}=useContext(MyContext);
  const navigate=useNavigate();

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
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createstock(formdata).then(() => {
      fetchstocks(); 
      setformdata({ stockname: '', ticker: '', quantity: '', price: '' }); 
    });
  };

  useEffect(()=>{
    fetchstocks();
    console.log(conts);
  },[])

  return (
    <div className='flex main_page'>
        <div className=" sidebar w-2/6 text-1xl h-screen font-bold leading-9 tracking-tight text-gray-900 justify-center border-r-2 border-black">
        <h2 className=' flex text-2xl p-5 font-bold justify-center items-center text-gray-800 h-20 mx-auto mb-2'
        style={{backgroundColor: 'orangered',backgroundImage: 'linear-gradient(90deg, #FF4500 0% ,#ff7f50 100%)'}}>Add Stocks</h2>
        <div className='px-5'>
          <form onSubmit={handleSubmit}> 
          <div>
            <label>Stock Name</label>
            <input className="border rounded-lg pl-2 p-1 w-full bg-white "
              type="text"
              name="stockname"
              value={formdata.stockname}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label> Ticker</label>
            <input className="border rounded-lg pl-2 p-1 w-full bg-white "
              type="text"
              name="ticker"
              value={formdata.ticker}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Quantity</label>
            <input className="border rounded-lg pl-2 p-1 w-full bg-white "
              type="number"
              name="quantity"
              value={formdata.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Buy Price</label>
            <input className="border rounded-lg pl-2 p-1 w-full bg-white "
              type="number"
              name="price"
              value={formdata.price}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className='flex text-lg p-5 font-bold justify-center items-center rounded-full mt-2 text-gray-800 w-2/6 h-12 mx-auto'
        style={{backgroundColor: 'orangered',backgroundImage: 'linear-gradient(270deg, #FF4500 0% ,#ff7f50 100%)'}}>
            Submit
          </button>
        </form>
        </div>
        </div>

        <div className="posts mx-auto rounded-lg w-4/6">
            {loading ? (
              <p className="animate-spin w-6 h-6 mx-auto mt-60">
                <ArrowPathIcon />
              </p>
            ) : conts.length > 0 ? (
              <div className="postslist max-h-[80vh] overflow-y-auto rounded-lg [&::-webkit-scrollbar]:w-0"
              >
                {conts.map((item) => (
                  <Post key={item._id} post={item}/>
                ))}
              </div>
            ) : (
              <p className="text-center font-bold text-3xl italic text-purple-400 animate-bounce tracking-tight pb-2 mt-40">
                No Cars to display
              </p>
            )}
          </div>
      </div>
  )
}

export default home_page