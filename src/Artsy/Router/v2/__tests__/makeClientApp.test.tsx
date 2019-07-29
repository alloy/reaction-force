import { SystemContextConsumer } from "Artsy"
import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { createMockNetworkLayer } from "DevTools"
import { mount } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { makeClientApp } from "../makeClientApp"

describe("makeClientApp", () => {
  it("resolves with a <ClientApp /> component", async () => {
    const { ClientApp } = await makeClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    const wrapper = mount(<ClientApp />)
    expect(wrapper.html()).toContain("<div>Hello Router</div>")
  })

  it("accepts an initial route", async () => {
    const { ClientApp } = await makeClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/cv",
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    const wrapper = mount(<ClientApp />)
    expect(wrapper.html()).toContain("<div>CV Page</div>")
  })

  it("bootstraps data from __RELAY_BOOTSTRAP__", async () => {
    window.__RELAY_BOOTSTRAP__ = JSON.stringify([
      [
        '{"queryID":"OrderQuery","variables":{"orderID":"0"}}',
        "found window cache",
      ],
    ])

    const { ClientApp } = await makeClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: () => <div>Hello Router</div>,
        },
        {
          path: "/cv",
          Component: () => <div>CV Page</div>,
        },
      ],
    })

    const wrapper = mount(<ClientApp />)
    expect(
      (wrapper
        .find("Boot")
        .props() as any).relayEnvironment.relaySSRMiddleware.cache.values()
    ).toContain("found window cache")
  })

  it("passes along initial context values", async done => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "mediator",
              "relayEnvironment",
              "routes",
              "user",
            ])
            setImmediate(done)
            return <div />
          }}
        </SystemContextConsumer>
      )
    }

    const { ClientApp } = await makeClientApp({
      history: {
        protocol: "memory",
      },
      routes: [
        {
          path: "/",
          Component: HomeApp,
        },
      ],
      context: {
        mediator: {
          trigger: jest.fn(),
        },
      },
    })

    mount(<ClientApp />)
  })

  describe("concerning GraphQL errors", () => {
    const consoleError = console.error

    beforeAll(() => {
      console.error = jest.fn()
    })

    afterAll(() => {
      console.error = consoleError
    })

    it("rejects with a GraphQL error", async () => {
      const relayNetwork = createMockNetworkLayer({
        Query: () => ({
          me: () => {
            throw new Error("Oh noes")
          },
        }),
      })
      const relayEnvironment = createRelaySSREnvironment({ relayNetwork })

      try {
        const { ClientApp } = await makeClientApp({
          history: {
            protocol: "memory",
          },
          routes: [
            {
              path: "/",
              Component: () => null,
              query: graphql`
                query makeClientAppTestQuery {
                  me {
                    __id
                  }
                }
              `,
            },
          ],
          context: { relayEnvironment },
        })
        mount(<ClientApp />)
      } catch (error) {
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })
})
