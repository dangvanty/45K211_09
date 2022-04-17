import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate } from 'react-router-dom'
const Search = ({history}) => {
    const navigate=useNavigate();
    
    const [keyword, setKeyword] =useState("");

    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        navigate(keyword.trim() ? `/products/${keyword}` : "/products");
    }
  return (
    <Fragment>
        <MetaData title="Tìm kiếm sản phẩm | Đồng Dũng"/>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
        </form>

    </Fragment>
  )
}

export default Search