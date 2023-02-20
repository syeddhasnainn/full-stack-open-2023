const Filter = ({filterprop,handleChange}) => {

    return(
    <>
    <div>filter shown with <input value={filterprop} onChange={handleChange}/></div>
    </>
    )
}
        
export default Filter