import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ListItemButton from "@mui/material/ListItemButton";
import Classes from "./Home.module.css";
import Navbar from "../Components/Navbar";
const Home = () => {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(()=>{
        axios.get('http://localhost:5000/blogs')
        .then(res => {
            setData(res.data);
            console.log(res.data); // Log the data here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    },[])

    const truncateDes = (description) => {
        if (description.length > 50) {
            return description.substring(0, 85) + "...";
        }
        return description;
    };
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredData = data.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearchQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearchQuery;
    });
    return (
        <div className={Classes.mainDiv}>
           <Navbar/>
           <div className="flex max-[600px]: flex-col">
           <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className={Classes.searchInput}
                    />
            <div className={Classes.cardContainer}>
            
                {filteredData.length === 0 && (
                    <p className="text-center w-[100%] flex justify-center">No Blog Found</p>
                )}
                {filteredData.map((item, index) => (
                <div key={index} className={Classes.card}>
                    <img src={item.imageUrl} alt={item.title} className={Classes.cardImage} />
                    <h2>{item.title}</h2>
                    <p>{truncateDes(item.description)} <Link to={`/blog/${item.id}`} className={Classes.readMoreLink}>Read More</Link></p>
                </div>
            ))}
            </div>
            <div className={Classes.RightSide}>
                <h2 className={Classes.categoryH3}>Category</h2>
            <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("All")}><p>All</p></ListItemButton></div>
                        <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("Food")}><p>Food</p></ListItemButton></div>
                        <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("Fashion")}><p>Fashion</p></ListItemButton></div>
                        <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("Sports")}><p>Sports</p></ListItemButton></div>
                        <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("Travel")}><p>Travel</p></ListItemButton></div>
                        <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("Fitness")}><p>Fitness</p></ListItemButton></div>
                        <div className={Classes.listButton}><ListItemButton onClick={() => handleCategoryClick("Tech")}><p>Tech</p></ListItemButton></div>

                        {/* "Travel","Fashion","Fitness","Sports","Food","Tech" */}
                </div>
                </div>
        </div>
    );
};

export default Home;
