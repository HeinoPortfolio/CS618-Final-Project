import { RecipeList } from './components/PostList.jsx'

const recipes = [
  {
    title:'This is a test recipe title',
    ingredientList: 'Some ingredients go here. \nSome others go here.',
    author: 'Matthew Heino',
    imageURL: 'http://someUrl1.com',
  },
  {
    title:'This is another test recipe title',
    ingredientList: 'Some other ingredients go here. \nMore go here. \nand some more',
    author: 'Claudia Heino',
    imageURL: 'http://someUrl1.com',
  },
]

export function App() {
  return (
    <RecipeList recipes={recipes} />
  )
}
