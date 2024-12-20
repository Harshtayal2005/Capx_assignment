import React, { useState, useContext } from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import MyContext from '../context/createContext';

const Post = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    stockname: post.stockname,
    ticker: post.ticker,
    quantity: post.quantity,
    price: post.price,
  });

  const { onUpdatestock, onDeletePost } = useContext(MyContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await onDeletePost(post._id);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await onUpdatestock(post._id, editData);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-50">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{post.stockname}</h3>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Ticker:</span> {post.ticker}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Quantity:</span> {post.quantity}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Buy Price:</span> ${post.price}
        </p>
      </div>

      {isEditing && (
        <form onSubmit={handleEditSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="stockname"
            value={editData.stockname}
            onChange={handleInputChange}
            placeholder="Stock Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="ticker"
            value={editData.ticker}
            onChange={handleInputChange}
            placeholder="Ticker"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="quantity"
            value={editData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="price"
            value={editData.price}
            onChange={handleInputChange}
            placeholder="Buy Price"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Action Buttons */}
      {!isEditing && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-blue-500 hover:underline"
          >
            <PencilSquareIcon className="w-5 h-5 mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center text-red-500 hover:underline"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
