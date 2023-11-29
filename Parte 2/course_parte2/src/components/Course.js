import React from "react";

const Parts = ({parts}) =>{
    return (
        parts.map(part => (
            <div key={part.id}>
                <p>{part.name}</p>
                <p>Exercises: {part.exercises}</p>
            </div>
        ))
    )
}
const Course = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of react",
                    exercises: 10,
                    id: 1
                },
                {
                    name: "Using props for pass data",
                    exercises: 7,
                    id: 2
                },
                {
                    name: "State of a components",
                    exercises: 14,
                    id: 3
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4
                }
            ],
            total: 10+7+14+11,
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
            total: 3+7,
        },
    ]
    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <div key={course.id}>
                    <h2>{course.name}</h2>
                    <Parts parts={course.parts}/>
                    <p>Total of exercises: {course.total}</p>
                </div>
            ))}
        </>
    )
}

export default Course