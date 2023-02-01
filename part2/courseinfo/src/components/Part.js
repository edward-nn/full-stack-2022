const Part = (props)=>{
    //console.log('propsPart', props)
    
    //let amount = [];
    /****
    const exercise = props.exercise;
    const amounts = [].reduce((s=0, exercise) => {
      console.log('what is happening', s, exercise)
      return (s + exercise )
    });
    console.log('props_amount', amounts)
    
    
    
     console.log('props_amount', amount)
    //amount = ([exercise]).reduce((a, b) => a + b, 0) 
    
     * const total = exercise.reduce((a, b) => {
      console.log('what is happening', a, b)
      return ((a, b) => a + b, 0) 
    })
    ***/
    

    return(
      <p>{props.part} {props.exercise}</p>
    )
  }

  export default Part;