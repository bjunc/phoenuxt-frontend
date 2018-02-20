import gql from 'graphql-tag'
import Vuex from 'vuex'

const createStore = () => {
	return new Vuex.Store({
    state: {
      session: null,
      userIsLoggedIn: false,
      user: null
    },
		actions: {
			async nuxtServerInit (store, context) {
        try {
          let client = context.app.apolloProvider.clients.defaultClient
          let response = await client.query({
            query: gql`query RootInitialState {
              viewer {
                id
                firstName
                lastName
                email
              }
            }`
          })
          console.log(response.data)
          store.state.user = response.data.viewer
        } catch (err) {
          console.error(err)
        }
      }
    }
  })
}

export default createStore
