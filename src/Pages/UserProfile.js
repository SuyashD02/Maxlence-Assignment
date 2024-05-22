import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Classes from './UserProfile.module.css';

const UserProfile = () => {
    const { username } = useParams();
    const [userBlogs, setUserBlogs] = useState([]);
    
    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/blogs');
                const blogs = response.data.filter(blog => blog.author === username);
                setUserBlogs(blogs);
            } catch (error) {
                console.error('Error fetching user blogs:', error);
            }
        };
        fetchUserBlogs();
    }, [username]);
    const truncateDes = (description) => {
        if (description.length > 50) {
            return description.substring(0, 85) + "...";
        }
        return description;
    };
    return (
        <div className={Classes.mainDiv}>
            <Navbar />
            <div className={Classes.profileContainer}>
                <h1>{username}'s Profile</h1>
                <div className={Classes.blogList}>
                    {userBlogs.length === 0 ? (
                        <p>No blogs Added yet.</p>
                    ) : (
                        userBlogs.map((blog, index) => (
                            <div key={index} className={Classes.card}>
                    <img src={blog.imageUrl} alt={blog.title} className={Classes.cardImage} />
                    <h2>{blog.title}</h2>
                    <p>{truncateDes(blog.description)} <Link to={`/blog/${blog.id}`} className={Classes.readMoreLink}>Read More</Link></p>
                </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
