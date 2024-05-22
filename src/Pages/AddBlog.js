import React,{useState} from "react";
import axios from "axios";
import Classes from "./Addblog.module.css";
import { useNavigate } from "react-router-dom";
// vznv1g7e
const initialState={
    title:"",
    description:"",
    category:"",
    imageUrl:""
}
const options=["Travel","Fashion","Fitness","Sports","Food","Tech"];
function AddBlog(){
    const [formValue,setFromValue]=useState(initialState);
    const [categoryErr,setCategoryErr]=useState(null);
    const [titleErr,setTitleErr]=useState(null);
    const [descriptionErr,setDescriptionErr]=useState(null);
    const [imageUrlErr,setImageUrlErr]=useState(null);
    const {title,description,category,imageUrl}=formValue;
    const navigate =useNavigate();
    const getDate=()=>{
        const today = new Date();
        return today.toISOString();
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!title){
            setTitleErr("Please enter a title");
        }
        if(!category){
            setCategoryErr("Please select a category");
        }
        if(!description){
            setDescriptionErr("Please enter a description");
        }
        if(!imageUrl){
            setImageUrlErr("Please select a image");
        }
        if(title && description && imageUrl && category){
           
            try {
                const currentDate = getDate();
                const authorName = localStorage.getItem('displayName'); 
                const updatedBlog = { ...formValue, date: currentDate,author: authorName };
                const response = await axios.post("http://localhost:5000/blogs", updatedBlog);
                if (response.status === 201) {
                    alert("Blog Created Successfully");
                    setFromValue(initialState);
                    navigate("/dashboard");
                } else {
                    alert("Something went wrong");
                }
            } catch (error) {
                console.error("Error creating blog:", error);
                alert("Failed to create blog. Please try again.");
            }
        }
    }
    const onInputChange=(e)=>{
        setTitleErr(null);
        setFromValue({...formValue,title: e.target.value})
    };
    const onInputChangeArea=(e)=>{
        setDescriptionErr(null);
        setFromValue({...formValue,description: e.target.value})
    };
    const onUploadImage = (file) => {
        setImageUrlErr(null);
            console.log("file", file);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "vznv1g7e");
            formData.append("cloud_name", "dmtlcmksw");
    
            axios.post("https://api.cloudinary.com/v1_1/dmtlcmksw/image/upload", formData)
                .then((resp) => {
                    alert("Image Uploaded Successfully");
                    console.log("Response",resp);
                    setFromValue((prevFormValue) => ({
                        ...prevFormValue,
                        imageUrl: resp.data.secure_url 
                    }));
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                    alert("Failed to upload image. Please try again.");
                });
        };
    const onCategoryChange=(e)=>{
        setCategoryErr(null);
        setFromValue({...formValue,category: e.target.value})
    };
    return(
        <div className={Classes.mainDiv}>
            
            <div className={Classes.containtDiv}>
            <p className="text-[30px] font-bold">Add Blog</p>
            <input 
            type="text"
            value={title ||""}
            name="title"
            onChange={onInputChange}
            placeholder="Title"
            required
            className="w-[100%] h-[35px]"
            />
             {titleErr && (
                <p className=" text-red-600 text-[14px] mt-[-5px] mr-[72%]">{titleErr}</p>
            )}
             <textarea 
            type="text"
            value={description || ""}
            name="description"
            onChange={onInputChangeArea}
            placeholder="Description"
            required
            className="w-[100%] h-[60px] mt-[12px] max-[600px]:h-[50px]"
            />
             {descriptionErr && (
                <p className=" text-red-600 text-[14px] mt-[-5px] mr-[62%]">{descriptionErr}</p>
            )}
             <input 
            type="file"
            onChange={(e)=>onUploadImage(e.target.files[0])}
            required
            className="w-[100%] h-[40px]  mt-[18px]"
            />
            {imageUrlErr && (
                <p className=" text-red-600 text-[14px] mt-[-5px] mr-[69%]">{imageUrlErr}</p>
            )}
            <br/>
            <select className="w-[100%] rounded-[4px] h-[35px] border-[#83ccc5] mt-[10px] outline-none" onChange={onCategoryChange}
            value={category}>
            <option>Please select category</option>
            {options.map((option,index)=>(
                <option value={option || ""} key={index}>
                    {option}
                </option>
            ))}
            </select>
            {categoryErr && (
                <p className=" text-red-600 text-[14px] mt-[-5px] mr-[65%]">{categoryErr}</p>
            )}
            <br/>
            <br/>
            <div className="w-[100%] mt-[-20px] flex justify-evenly">
            <button type="submit" className="mr-[10px] h-[30px] w-[30%] bg-[#3434f4] rounded-[4px] border-none text-[#fff]" onClick={handleSubmit} >Add</button>
            <button  className="mr-[10px] w-[30%] h-[30px] bg-[#2cc331] border-none rounded-[4px] text-[#fff]" onClick={()=>navigate("/dashboard")}>Go Back</button>
            </div>
            </div>
        </div>
    )
}
export default AddBlog;
