import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Classes from './Blog.module.css';
import { useNavigate } from "react-router-dom";

function Blog(){
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const authorName = localStorage.getItem('displayName');
    const navigate =useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:5000/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
            })
            .catch(error => {
                console.error('Error fetching blog data:', error);
            });
    }, [id]);

    const handleDelete = () => {
        if (authorName === blog.author) {
            axios.delete(`http://localhost:5000/blogs/${id}`)
                .then(() => {
                    console.log('Blog deleted successfully');
                    navigate("/dashboard");
                })
                .catch(error => {
                    console.error('Error deleting blog:', error);
                });
        } else {
            console.log("You are not authorized to delete this blog.");
        }
    };

    const handleEdit=()=>{
        navigate(`/edit/${id}`);
    };
    const handleBack=()=>{
        navigate('/dashboard');
    }
    if (!blog) {
        return <p>Loading...</p>;
    }
    const formattedDate = new Date(blog.date).toLocaleDateString();
    return (
        <div>
            <Navbar />
            <div className={Classes.blogDetailContainer} style={{ backgroundImage: `url(${blog.imageUrl})` }}>
                
                <h1 className="mt-[70px] text-[45px]">{blog.title}</h1>
                <p className="text-[20px] mt-[-5px]"><strong>Category:</strong> {blog.category}</p>
                <p className=' mt-[-10px]'>Date Posted:{formattedDate}</p>
                <p className="text-[27px] font-semibold">{blog.description}</p>
                {authorName === blog.author && (
                    <button className="absolute mt-[448px] ml-[25%] text-[#fff] rounded-[5px] bg-[#2382ffe9] border-none cursor-pointer w-[100px] h-[30px] max-[600px]:relative max-[600px]:mt-[10px]" onClick={handleDelete}>Delete</button>
                    
                )}
                <button className=" absolute mt-[448px] mr-[0%] text-[#fff] rounded-[5px] bg-[#2382ffe9] border-none cursor-pointer w-[100px] h-[30px] max-[600px]:relative max-[600px]:mt-[10px]  "  onClick={handleBack}>Back</button>
                {authorName === blog.author && (
                <button className=" absolute mt-[448px] mr-[25%] text-[#fff] rounded-[5px] bg-[#2382ffe9] border-none cursor-pointer w-[100px] h-[30px] max-[600px]:relative max-[600px]:mt-[10px]" onClick={handleEdit}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default Blog;
