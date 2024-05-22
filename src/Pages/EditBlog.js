import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Classes from './EditBlog.module.css'; // Make sure to import your CSS file

function EditBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        imageUrl: ""
    });
    const navigate = useNavigate();
    const { title, description, category, imageUrl } = formData;
    const [categoryErr, setCategoryErr] = useState(null);
    const [titleErr, setTitleErr] = useState(null);
    const [descriptionErr, setDescriptionErr] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
                setFormData({
                    title: res.data.title,
                    category: res.data.category,
                    description: res.data.description,
                    imageUrl: res.data.imageUrl
                });
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error messages when input changes
        if (name === 'title') setTitleErr(null);
        if (name === 'category') setCategoryErr(null);
        if (name === 'description') setDescriptionErr(null);
        
    };
    const getDate=()=>{
        const today = new Date();
        return today.toISOString();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) setTitleErr("Please enter a title");
        if (!category) setCategoryErr("Please select a category");
        if (!description) setDescriptionErr("Please enter a description");
        
        if (title && description && imageUrl && category) {
            const currentDate = getDate();
                const authorName = localStorage.getItem('displayName'); 
                const updatedBlog = { ...formData, date: currentDate,author: authorName };
            axios.put(`http://localhost:5000/blogs/${id}`, updatedBlog)
                .then(res => {
                    console.log('Blog updated successfully:', res.data);
                    navigate(`/blog/${id}`);
                })
                .catch(error => {
                    console.error('Error updating blog:', error);
                });
        }
    };

    return (
        <div className={Classes.mainDiv}>
            {blog ? (
                <div className={Classes.containtDiv}>
                    <p className="text-[30px] font-bold">Edit Blog</p>
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                        required
                        className="w-[100%] h-[35px]"
                    />
                    {titleErr && (
                        <p className="text-red-600 text-[14px] mt-[-5px] mr-[72%]">{titleErr}</p>
                    )}
                    <textarea
                        value={description}
                        name="description"
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        className="w-[100%] h-[60px] mt-[12px]"
                    />
                    {descriptionErr && (
                        <p className="text-red-600 text-[14px] mt-[-5px] mr-[62%]">{descriptionErr}</p>
                    )}
                    
                    <br />
                    <select
                        className="w-[100%] rounded-[4px] h-[35px] border-[#83ccc5] mt-[10px] outline-none"
                        onChange={handleChange}
                        value={category}
                        name="category"
                    >
                        <option value="">Please select category</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    {categoryErr && (
                        <p className="text-red-600 text-[14px] mt-[-5px] mr-[65%]">{categoryErr}</p>
                    )}
                    <br />
                    <br />
                    <div className="w-[100%] mt-[-20px] flex justify-evenly">
                        <button type="submit" className="mr-[10px] h-[30px] w-[30%] bg-[#3434f4] rounded-[4px] border-none text-[#fff]" onClick={handleSubmit}>Update</button>
                        <button className="mr-[10px] w-[30%] h-[30px] bg-[#2cc331] border-none rounded-[4px] text-[#fff]" onClick={() => navigate("/dashboard")}>Go Back</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EditBlog;
