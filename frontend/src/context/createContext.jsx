import {React ,createContext,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const apiurl = import.meta.env.VITE_API_URL;

const MyContext=createContext();

export const Myprovider=({children})=>{
    const [conts,setconts] =useState([]);
    const [loading, setLoading] = useState(true);

    const navigate=useNavigate();

    const createstock=async (formdata)=>{
      let response=await fetch(`${apiurl}/stocks/add`,{
        method : "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
        credentials:'include',
        })

        if(response.ok){
          navigate('/');
        }
        else if(response.status===404){
          alert('already exist');
        }
        else{
          alert('someerroroccured');
        }
  }

    const fetchstocks = async () => {
        try {
          const response = await fetch(`${apiurl}/stocks/getallstocks`,{
            credentials:'include',
          }
        );
          const {stock}= await response.json();
          setconts(stock); 
          setLoading(false);
        } catch (error) {
          alert(error.message);
          setLoading(false);
        } 
      };

      const onUpdatestock = async (postId, updatedData) => {
        try {
          const response = await fetch(`${apiurl}/stocks/${postId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
            credentials:'include',
          });
          if (response.ok) {
            fetchstocks();
          }
        } catch (error) {
          console.error('Error updating post:', error);
        }
      };
      
      const onDeletePost = async (postId) => {
        try {
          const response = await fetch(`${apiurl}/stocks/delete/${postId}`, {
            method: 'DELETE',
            credentials:'include',
          });
          if (response.ok) {
            fetchstocks();
          }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };

      return (
        <MyContext.Provider value={{loading,conts,fetchstocks,createstock,onUpdatestock,onDeletePost}}>
            {children}
        </MyContext.Provider>
    );
    
}

export default MyContext;