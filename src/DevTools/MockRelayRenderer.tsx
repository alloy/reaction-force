import { ContextProvider } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import { IResolvers } from "graphql-tools/dist/Interfaces"
import React from "react"
import { QueryRenderer, RelayContainer } from "react-relay"
import {
  Environment,
  GraphQLTaggedNode,
  OperationBase,
  OperationDefaults,
  RecordSource,
  Store,
} from "relay-runtime"
import { createMockNetworkLayer } from "./createMockNetworkLayer"

export interface MockRelayRendererProps<
  T extends OperationBase = OperationDefaults
> {
  Component: RelayContainer<T["response"]>
  variables?: T["variables"]
  query: GraphQLTaggedNode
  mockResolvers: IResolvers
}

export interface MockRelayRendererState {
  caughtError: {
    error: any
    errorInfo: any
  }
}

/**
 * Renders a tree of Relay containers with a mocked local instance of the
 * metaphysics schema.
 *
 * @note
 * Use this component in storybooks, but not tests. Because Relay works
 * asynchronously _and_ a tree may contain nested `QueryRenderer` components,
 * for tests you should usually use {@link renderRelayTree}.
 *
 * @param params.Component
 * The component that either is a Relay container or has children that are Relay
 * containers.
 *
 * @param params.variables
 * The optional variables that should be used in the operation. In most cases
 * you should be able to just hardcode these into the root query.
 *
 * @param params.query
 * The root GraphQL query.
 *
 * @param params.mockResolvers
 * A list of types/fields, that are part of metaphysics’ schema, and the data to
 * return for those. See {@link https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks}
 *
 * @example
 *
   ```tsx
   jest.unmock("react-relay")

   const Artwork = createFragmentContainer(
     props => (
       <div>
         <span>{props.artwork.title}}</span>
         <img src={props.artwork.image.url} />
       </div>
     ),
     graphql`
       fragment MockRelayRenderer_artwork on Artwork {
         image {
           url
         }
       }
     `
   )

   it("renders a Relay tree", done => {
     const wrapper = mount(
       <MockRelayRenderer
         Component={Artwork}
         query={graphql`
           query MockRelayRendererQuery {
             artwork(id: "mona-lisa") {
               ...MockRelayRenderer_artwork
             }
           }
         `}
         mockResolvers={{
           Artwork: () => ({
             title: "Mona Lisa",
             image: {
               url: "http://test/image.jpg",
             },
           }),
         }}
       />
     )
     setTimeout(() => {
       expect(wrapper.find("span").text()).toEqual("Mona Lisa")
       expect(wrapper.find("img").props().src).toEqual("http://test/image.jpg")
       done()
     }, 10)
   })
   ```
 *
 */
export class MockRelayRenderer<
  T extends OperationBase = OperationDefaults
> extends React.Component<MockRelayRendererProps<T>, MockRelayRendererState> {
  state = {
    caughtError: undefined,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ caughtError: { error, errorInfo } })
  }

  render() {
    // TODO: When extracting these test utils to their own package, this check
    //       should probably become a custom TSLint rule, as there’s no good way
    //       to test this in a generic way, plus with the rule we get fixes.
    if (
      typeof __webpack_require__ === "undefined" &&
      QueryRenderer === require("../../__mocks__/react-relay").QueryRenderer
    ) {
      throw new Error(
        "The `react-relay` module has been mocked, be sure to unmock it with: " +
          '`jest.unmock("react-relay")`'
      )
    }

    if (this.state.caughtError) {
      const { error, errorInfo } = this.state.caughtError
      console.error({ error, errorInfo })
      return `Error occurred while rendering Relay component: ${error}`
    }

    const { Component, variables, query, mockResolvers } = this.props

    const network = createMockNetworkLayer({
      ...mockResolvers,
    })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({
      network,
      store,
    })

    return (
      <ContextConsumer>
        {contextProps => (
          <ContextProvider {...contextProps} relayEnvironment={environment}>
            <QueryRenderer
              // tslint:disable-next-line relay-operation-generics
              query={query}
              environment={environment}
              variables={variables || {}}
              // We rely on renderWithLoadProgress to throw an error in the test
              // env ASAP. When we extract these test helpers to their own package
              // that will need to be handled explicitly.
              render={renderWithLoadProgress(Component as any)}
            />
          </ContextProvider>
        )}
      </ContextConsumer>
    )
  }
}
