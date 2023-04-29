import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [signUpIsOpen,setSignUpIsOpen] = useState(false);
    const [search,setSearch] = useState('');
    const [category,setCategory] = useState('All');
    const [filteredData, setFilteredData] = useState([]);
    const [sortOptions,setSortOptions] = useState('');
    const [sortedData, setSortedData] = useState([]);
      const { data, fetchError, isLoading ,categories} = useAxiosFetch(
        "https://dummyjson.com/products?limit=100"
      );


      useEffect(() => {
          setFilteredData(data);
      },[data])


      useEffect(() => {

        let filtered;
        if (filteredData && category) {
           
            if(category === "All"){
              filtered=data;
            }
            else{
           
             filtered = data.filter((item) => {
                return item.category === category;
            });


            
          }

         
        }
        if(filteredData && search){
          filtered = filtered.filter((item) => 
           
         (item.brand.toLowerCase().includes(search.toLowerCase()) ||
         item.category.toLowerCase().includes(search.toLowerCase()) || 
         item.title.toLowerCase().includes(search.toLowerCase())
         )
         );
         
 
       }
       if(filtered){
        setFilteredData(filtered);
       }

    }, [filteredData, category,search]);




    useEffect(() => {
      if (sortOptions === "") {
        setSortedData(filteredData);
        return;
      }
  
      if (filteredData) {
        const filtered = [...filteredData];
  
        if (sortOptions === "low") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortOptions === "high") {
          filtered.sort((a, b) => b.price - a.price);
        }
  
        setSortedData(filtered);
      }
    }, [sortOptions, filteredData]);
      
     
    return (
      <DataContext.Provider
        value={{sortedData, setSortOptions,sortOptions,isOpen,filteredData, setIsOpen, signUpIsOpen, setSignUpIsOpen ,data,categories,isLoading,fetchError,setSearch,setCategory,category,setSearch}}
      >
        {children}
      </DataContext.Provider>
    );
}


export default DataContext;