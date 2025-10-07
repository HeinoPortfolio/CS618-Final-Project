export function CreateRecipe() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor='create-title'> Recipe Title: </label>
        <input type='text' name='create-title' id='create-title' />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input type='text' name='create-author' id='create-author' />
      </div>
      <br />
      <div>
        <label htmlFor='create-imageURL'>URL for image: </label>
        <input type='text' name='create-imageURL' id='create-imageURL' />
      </div>
      <br/>
      <label htmlFor='recibe-box'>Enter the recipe below:</label>
      <br/>
      <br />
      <textarea id='comment-box' name='recipe-area' rows='20' cols='60' />
      <br />
      <br />
      <input type='submit' value='Create' />
    </form>
  )
}
