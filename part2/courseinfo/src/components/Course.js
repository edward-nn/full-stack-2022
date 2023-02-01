import Header from "./Header" ;
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {  
console.log('CourseProps',props) 
     const { course } = props
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} key={course.id} />
      <Total result={course.parts} key={course.parts.id} />
    </div>
  )
}

export default Course