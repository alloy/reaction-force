/**
 * @jest-environment node
 */

import { ContextConsumer } from "Artsy"
import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { buildServerApp, ServerRouterConfig } from "Artsy/Router/buildServerApp"
import { createMockNetworkLayer } from "DevTools"
import { render } from "enzyme"
import React from "react"
import { Title } from "react-head"
import { graphql } from "react-relay"
import { Media } from "Utils/Responsive"

jest.mock("loadable-components/server", () => ({
  getLoadableState: () =>
    Promise.resolve({
      getScriptTag: () => "__LOADABLE_STATE__",
    }),
}))

const defaultComponent = () => <div>hi!</div>

describe("buildServerApp", () => {
  const getWrapper = async ({
    url = "/",
    Component = defaultComponent,
    ...options
  }: { Component?: React.ComponentType } & Pick<
    ServerRouterConfig,
    Exclude<keyof ServerRouterConfig, "routes">
  > = {}) => {
    const { ServerApp, ...rest } = await buildServerApp({
      routes: [
        {
          path: "/",
          Component,
        },
        {
          path: "/relay",
          Component,
          query: graphql`
            query buildServerAppTestQuery {
              me {
                __id
              }
            }
          `,
        },
      ],
      url,
      userAgent: "A random user-agent",
      ...options,
    })
    return {
      ...rest,
      wrapper: render(<ServerApp />),
    }
  }

  it("resolved with a <ServerApp /> component", async () => {
    const { wrapper } = await getWrapper()
    expect(wrapper.html()).toContain("<div>hi!</div>")
  })

  it("bootstraps relay and loadable-components SSR data", async () => {
    const { scripts } = await getWrapper()
    expect(scripts).toContain("__RELAY_BOOTSTRAP__")
    expect(scripts).toContain("__LOADABLE_STATE__")
  })

  it("resolves with a 200 status if url matches request", async () => {
    const { status } = await getWrapper({ url: "/" })
    expect(status).toEqual(200)
  })

  it("resolves with a 404 status if url does not match request", async () => {
    const { status } = await getWrapper({ url: "/bad-url" })
    expect(status).toEqual(404)
  })

  it("resolves with headTags if react-head components present", async () => {
    const { headTags } = await getWrapper({
      Component: () => <Title>test</Title>,
    })
    // Enzyme won't render the right results for the title for whatever reason
    // It renders fine with renderToString though. ¯\_(ツ)_/¯
    expect(headTags[headTags.length - 1].type).toBe("title")
    expect(headTags[headTags.length - 1].props.children).toBe("test")
  })

  it("passes items along in context option", async done => {
    const HomeApp = () => {
      return (
        <ContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "foo",
              "mediator",
              "onlyMatchMediaQueries",
              "relayEnvironment",
              "resolver",
              "routes",
              "user",
            ])
            setImmediate(done)
            return <div />
          }}
        </ContextConsumer>
      )
    }

    await getWrapper({
      Component: HomeApp,
      context: {
        foo: "bar",
        mediator: {
          trigger: jest.fn(),
        },
      },
    })
  })

  it("passes along rendered css", async () => {
    const { styleTags } = await getWrapper()
    expect(styleTags).toContain("style data-styled-components")
  })

  describe("concerning device detection", () => {
    const MediaComponent = () => (
      <div>
        <Media at="xs">
          <span>xs</span>
        </Media>
        <Media at="lg">
          <span>lg</span>
        </Media>
        <Media interaction="hover">
          <span>hover</span>
        </Media>
        <Media interaction="notHover">
          <span>notHover</span>
        </Media>
      </div>
    )

    it("renders all media queries when no user-agent exists", async () => {
      const { wrapper } = await getWrapper({
        Component: MediaComponent,
        userAgent: undefined,
      })
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders all media queries for unknown devices", async () => {
      const { wrapper } = await getWrapper({
        Component: MediaComponent,
        userAgent: "Unknown device",
      })
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "lg", "hover", "notHover"])
    })

    it("renders some media queries for known devices", async () => {
      const { wrapper } = await getWrapper({
        Component: MediaComponent,
        userAgent: "Something iPhone; something",
      })
      expect(
        wrapper
          .find("span")
          .map((_, el) => el.firstChild.data)
          .get()
      ).toEqual(["xs", "notHover"])
    })
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
        await getWrapper({
          url: "/relay",
          context: { relayEnvironment },
        })
      } catch (error) {
        expect(error.message).toMatch(/Oh noes/)
      }
    })
  })
})
