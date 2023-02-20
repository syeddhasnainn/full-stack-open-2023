const PersonForm = ({handleSubmit,newName,handleName, newNumber,handleNumber}) => {

  return(
  <>
  <form onSubmit={handleSubmit}>
  <div>Name:<input type='text' value = {newName} onChange={handleName}/></div>
  <div>Number:<input type='text' value = {newNumber} onChange={handleNumber}/></div>
    <div><button type="submit">add</button></div>
</form>
</>
  )
      
}

export default PersonForm

