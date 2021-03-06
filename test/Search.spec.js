import React from 'react'
import { Provider } from 'react-redux'
import Search, { Unwrapped as UnwrappedSearch} from '../js/Search'
import ShowCard from '../js/ShowCard'
import { shallow, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { setSearchTerm } from '../js/actionCreators'
import store from '../js/store'
import preload from '../public/data.json'

test('Search should search titles', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm='' />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('Search should render a ShowCard for each show', () => {
  const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm='' />)
  expect(component.find(ShowCard).length).toEqual(preload.shows.length)
})

test('Search should render correct amount of shows based on search', () => {
  const searchWord = 'house'
  store.dispatch(setSearchTerm(searchWord))
  const component = render(<Provider store={store}><Search shows={preload.shows} /></Provider>)
  const showCount = preload.shows
    .filter((show) => `${show.title.toUpperCase()} ${show.description.toUpperCase()}`
    .includes(searchWord.toUpperCase()))
    .length
  expect(showCount).toEqual(component.find('.show-card').length)
})
