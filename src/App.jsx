import { Recipe } from './components/Recipe.jsx'

export function App() {
  return (
    <Recipe
      title='This is a test recipe title'
      ingredientList='Some ingredients go here. Some others go here.'
      author='Matthew Heino'
      imageURL='http://someUrl1.com'
    />
  )
}
