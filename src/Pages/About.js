import React from "react";
import Navbar from "../Components/Navbar";
import Classes from "./About.module.css";

const About = () => {
    return (
        <div className={Classes.mainDiv}>
            <Navbar />
            <div className={Classes.aboutContainer}>
                <h1 className={Classes.title}>About Us</h1>
                <p className={Classes.description}>
                    Welcome to My blog! I am passionate about sharing valuable content on various topics including Travel, Fashion, Fitness, Sports, Food, and Tech.
                </p>
                <h2 className={Classes.subtitle}>Contact Me</h2>
                <p className={Classes.text}>
                If you have any suggestions or feedback about the website, or if you simply want to share your thoughts, feel free to reach out to me at <a href="linkedin.com/in/suyash-dattawade">Linkedin</a>.
                </p>
            </div>
        </div>
    );
};

export default About;
