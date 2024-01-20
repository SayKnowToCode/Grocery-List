import Header from "./Header";
import Lists from "./Lists";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";
import React,{useState,useEffect} from "react";

function App() {

const API_URL = 'http://localhost:3500/items';

const [items, setItems] = useState([]);
const [newItem,setNewItem] = useState('');
const [search,setSearch] = useState('');
const [fetchError,setFetchError] = useState(null);
const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchItems = async () => {

      try {
        const response = await fetch(API_URL);

        if( ! response.ok)
        {
          throw Error('Did not receive expected data')
        }

        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        // console.log(error.stack);
        // console.log(error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false)
      }

    }
    
    setTimeout(() => {
      // (async () => await fetchItems()) ();
      fetchItems();
    },2000)
    
    
  },[])

  //Using empty array as dependency in second argument of useEffect means it will run only once before rendering  

const handleCheck = async (id) => {
  console.log(`key : ${id}`);

  const listItems = items.map((item) => {
      if(item.id === id)
      {
          if(item.checked)
              item.checked = false;
          else
              item.checked = true;
      }
      return item;
  })

  setItems(listItems);

  const myItem = listItems.filter((item) => item.id === id)

  const updateOptions = {
    method : 'PATCH',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({checked : myItem[0].checked})
  }

  const reqURL = `${API_URL}/${id}`
  const result = await apiRequest(reqURL,updateOptions)
  if(result) { setFetchError(result) }
}

const handleDelete = async (id) => {
  console.log(`key : ${id}`);
  const listItems = [];
  let counter = 1;

  for (let index = 0; index < items.length; index++) 
  {
      if(items[index].id !== id)
      {
        const obj = {
          id : counter++,
          checked : items[index].checked,
          item : items[index].item
        }

        listItems.push(obj);
      }
    
  }

  setItems(listItems);

  const deleteOptions = {method : 'DELETE'}
  const reqURL = `${API_URL}/${id}`
  const result = await apiRequest(reqURL,deleteOptions)
  if(result) { setFetchError(result) }
  
}

const handleSubmit = async (event) => {
  event.preventDefault();
  if(newItem === '') return;

  console.log("Submitted");
  setNewItem('');

  const id = items.length+1;
  const myNewItem = {id : id, checked:false , item:newItem}

  const listItems = [...items,myNewItem]
  setItems(listItems);
  
  
  // console.log(items);
  // items.push(myNewItem);
  // console.log(items);
  // setItems(items);  

  const postOptions = {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(myNewItem)
  }

  const result = await apiRequest(API_URL,postOptions);
  if(result) setFetchError(result);

}

  return (
    <div className="App">
      
      <Header title="Groceries"/>


      <AddItem 
          newItem = {newItem}
          setNewItem = {setNewItem}
          handleSubmit = {handleSubmit}
      />

      <SearchItem
          search = {search}
          setSearch = {setSearch}
      />

      <main>
        {isLoading && <p>Loading items ........</p>}
        {fetchError && <p style={{color : "red"}}>{`Error : ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Lists 
          items = {items}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
          search = {search}
        />}
      </main>

      <Footer length = {items.length}/>
      {/* These are called as Functional Components in React  */}
    </div>
  );
}

export default App;
