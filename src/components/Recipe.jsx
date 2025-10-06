import PropTypes from 'prop-types'

export function Recipe({ title, author, ingredientList, imageURL }) {
  return (
    
    <article>
      <h3>{title}</h3>

      <div>
        {ingredientList}
      </div>
      
      {author && (
        <em>
          Written by: <strong>{author}</strong>
        </em>
      )}
      <div>
        <img src={imageURL} alt='' />
      </div>
    </article>
  )
} // end Recipe

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.string,
  author: PropTypes.string,
  imageURL: PropTypes.string,
}
