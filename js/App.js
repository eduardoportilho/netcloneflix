import React from 'react'
import { Match } from 'react-router'
import { Provider } from 'react-redux'
import store from './store'
import Search from './Search'
import Details from './Details'
import preload from '../public/data.json'
import AsyncRoute from './AsyncRoute'

if (global) {
  global.System = { import () {} }
}

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Match
          exactly
          pattern='/'
          component={(props) => <AsyncRoute props={props} loadingPromise={System.import('./Landing')} />}
        />
        <Match pattern='/search' component={(props) => <Search shows={preload.shows} {...props} />} />
        <Match pattern='/details/:id' component={(props) => {
          const show = preload.shows.filter((show) => props.params.id === show.imdbID)
          return <Details show={show[0]} {...props} />
        }} />
      </div>
    </Provider>
  )
}

export default App
