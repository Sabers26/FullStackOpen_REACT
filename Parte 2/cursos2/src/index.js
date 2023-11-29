import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
  const course = {
    name:"Half Stack application development",
    parts:[
      {
        name: "Fundamentals of react",
        exercises: 10
      },
      {
        name:"Using props for pass data",
        exercises: 7
      },
      {
        name:"State of a components",
        exercises: 14
      }
    ],
    total: 10+7+14
  }
  return (
    <>
      <h1>{course.name}</h1>
      <p>{course.parts[0].name} Exercises: {course.parts[0].exercises}</p>
      <p>{course.parts[1].name} Exercises: {course.parts[1].exercises}</p>
      <p>{course.parts[2].name} Exercises: {course.parts[2].exercises}</p>
      <p>Total of exercises: {course.total}</p>
    </>
  )
}
ReactDOM.render(<App/>, document.getElementById("root"))

