import React from 'react'
import Total from './Total'

const Contents = ({ course }) => {

    return (
        <div>
            <p>{""}</p>
            <br />
            <h3>{course.name}</h3>
            <div>
                {course.parts.map((part, j) => (
                    <p key={j}>
                        {course.parts[j].name}  {course.parts[j].exercises}
                    </p>
                ))}
                 <Total course={course} />
            </div>
        </div>
    )
}

export default Contents