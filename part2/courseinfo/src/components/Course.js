import React from 'react';

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <h2>
        Number of exercises{' '}
        {course.parts.reduce((total, part) => total + part.exercises, 0)}
      </h2>
    </div>
  );
};

export default Course;