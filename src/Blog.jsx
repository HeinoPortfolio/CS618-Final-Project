import { CreateRecipe } from './components/CreateRecipe.jsx'
import {RecipeList} from './components/RecipeList.jsx'
import {RecipeFilter} from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'

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

export function Blog(){
	return(
		<div style={{ padding: 8}}>
      <h1>Welcome to the Recipe Blog! </h1>
			<CreateRecipe />
			<br />
			<hr />
			Filter By:
			<RecipeFilter field='author' />
			<br />
			<RecipeSorting fields={['createdAt', 'updatedAt'] }/>
			<hr />
			<RecipeList recipes={recipes} />
		</div>
	)
}