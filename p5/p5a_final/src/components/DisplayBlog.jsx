import React from 'react'
const DisplayBlog = ({ blog }) => (
    <div>
        <h3>{blog.title}</h3>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
    </div>
)

export default DisplayBlog