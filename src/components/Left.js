import React,{useContext,useState} from 'react'
import DataContext from '../context/DataContext'
import { useNavigate } from 'react-router-dom';

const Left = () => {
    const {categories,setCategory,category} = useContext(DataContext);
    const navigate = useNavigate();
    console.log("cate")
  console.log(categories);

  return <div className="left">
    
    <h3 className='left-title'>Select your Products</h3>
    
    <button id={category=="All" ? 'selected-btn' : ""} onClick={(e) => {navigate('/'); setCategory('All')
      }} >All</button>
    {categories.map((item) => {
    return (
      <button id={category==item ? 'selected-btn' : ""} key={item} onClick={(e) => {navigate('/'); setCategory(e.target.value)
      }} value={item}>{item}</button>
    )

  })}</div>;
}

export default Left