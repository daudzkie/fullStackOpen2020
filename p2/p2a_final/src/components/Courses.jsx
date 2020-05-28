import React from 'react'
import Contents from './Contents'

const Courses = ({ courses }) => {

    return(
        <div>
            {courses.map((course, i) => (
                <ul key={i} style={{padding: 0}}>
                    <Contents course={course} />
                </ul>
            ))}
        </div>
    )
}

export default Courses
