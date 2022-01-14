import React from 'react'
import { Page, AppProvider, Layout, Card, Heading } from '@shopify/polaris'
import PropTypes from 'prop-types'
import ReturnsTable from 'containers/ReturnsTable/'

const fullwidth = true
const sectioned = false
class Index extends React.Component {
  constructor(props, context) {
    super(props, context)

    const { shop, shopId } = props
    this.state = {
      selectedTab: 0
    }

    this.tabs = [
      { name: 'Active', panel: <ReturnsTable archived={false} shopId={shopId} shop={shop} index="0" /> },
      { name: 'Archived', panel: <ReturnsTable archived shopId={shopId} shop={shop} index="1" /> }
    ]

    this.tabPanel = <ReturnsTable archived={false} shopId={shopId} shop={shop} />
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleTabChange(event) {
    const value = event
    if (value.target.value !== undefined) {
      const tab = parseInt(value.target.value, 10)
      this.setState({ selectedTab: tab })
      this.tabPanel = this.tabs[tab].panel
    }
  }

  handleChange(url) {
    this.context.router.history.push(`/${url}`)
  }

  render() {
    const { selectedTab } = this.state

    return (
      <AppProvider>
        <Page fullWidth={fullwidth}>
          <div className="row">
            <div className="col-sm-12">
              <div className="header-container pc-3">
                <Heading element="h2">Home page</Heading>
              </div>
            </div>
          </div>
          <div className="my-returns">
            <Layout sectioned={sectioned}>
              <Layout.Section>
                <Card>{this.tabPanel}</Card>
              </Layout.Section>
            </Layout>
          </div>
        </Page>
      </AppProvider>
    )
  }
}

Index.contextTypes = {
  router: PropTypes.object
}

export default Index
