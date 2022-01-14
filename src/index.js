import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-boost'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

// App Imports
import { APP_URL_API } from 'setup/config'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'

// Css Imports
import 'bootstrap/dist/css/bootstrap.min.css'
import '@shopify/polaris/styles.css'
import 'react-responsive-tabs/styles.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import 'assets/css/style.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: APP_URL_API
})

const url = window.location.search
const parsedURL = queryString.parse(url)
const { shop } = parsedURL

// Render App
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <ApolloProvider client={client}>
          <Component shop={shop} params={url} />
        </ApolloProvider>
      </Router>
    </AppContainer>,
    document.getElementById('root')
  )
}

// Service Worker
registerServiceWorker()

// Render once
render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App)
  })
}
