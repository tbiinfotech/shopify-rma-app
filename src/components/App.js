import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import { routes } from 'setup/routes'
import Header from './common/Header'
import Help from './HelpPage'
import ReturnsPage from './ReturnsPage'

// React Alert
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional cofiguration
const alertOptions = {
  position: 'top right',
  timeout: 5000,
  offset: '20px',
  transition: 'fade'
}

class App extends React.Component {
  render() {
    const { shop, shopId, apiClientId } = this.props

    return (
      <div className="container-fluid">
        <Header />
        <AlertProvider {...alertOptions} template={AlertTemplate}>
          <Switch>
            <Route
              path={routes.home}
              render={() => <ReturnsPage apiKey={apiClientId} shopId={shopId} shop={shop} />}
              exact
            />
            <Route path={routes.help} render={() => <Help />} />
          </Switch>
        </AlertProvider>
      </div>
    )
  }
}

App.defaultProps = {
  shop: ''
}

App.propTypes = {
  // token: PropTypes.string.isRequired,
  shop: PropTypes.string,
  shopId: PropTypes.number.isRequired,
  apiClientId: PropTypes.string.isRequired
}

export default App
