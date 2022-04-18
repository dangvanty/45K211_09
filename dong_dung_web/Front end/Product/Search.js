import React,{usestate,Fragment} from 'react';

const Search = ({history}) => {
    const [keyword,setKeyword]=usestate("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push('/products/${keyword}');
        } else{
            history.push("/products");
        }
    };
  return (
      <Fragment>
          <form className="searchBox" onSubmit={searchSubmitHandler}>
              <input
              type="text"
              placeholder="Search a Product ..."
              onChange={(e)=>setKeyword(e.target.value)}
              />
              <input type ="submmie" value="Search"/>
          </form>
      </Fragment>
 
  );
};

export default Search