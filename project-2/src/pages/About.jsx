import React from 'react'
import "./About.css";

const About = () => {
  return (
    <div className='about-container'>
      <p><h2>
        Welcome to our Real Estate Platform, a simple and
        user-friendly website designed to help users discover,
        explore, and manage property listings.
      </h2></p>

      <h2>Our Features</h2>

      <ul>
        <li>Browse a wide range of properties</li>
        <li>Search properties by title</li>
        <li>Filter properties by type and price</li>
        <li>Save favourite properties</li>
        <li>Add new property listings</li>
        <li>Edit existing property information</li>
        <li>Secure user authentication</li>
      </ul>

      <h2>Our Mission</h2>

      <p>
        Our goal is to make property searching easier and more
        convenient by providing an intuitive platform where users
        can quickly find homes, apartments, villas, and other
        real estate options.
      </p>

      <h2>Built With</h2>

      <p>
        React • FastAPI • MongoDB • CSS • JavaScript
      </p>
</div>
    
  )
}

export default About