/**
 * @jest-environment node
 */

import { SystemContextConsumer } from "Artsy"
import { createRelaySSREnvironment } from "Artsy/Relay/createRelaySSREnvironment"
import { ServerRouterConfig } from "Artsy/Router/buildServerApp"
import { __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__ } from "Artsy/Router/v2/buildServerApp2"
import { createMockNetworkLayer } from "DevTools"
import { render } from "enzyme"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { makeServerApp } from "../makeServerApp"

const defaultComponent = () => <div>hi!</div>

describe("makeServerApp", () => {
  const getWrapper = async ({
    url = "/",
    Component = defaultComponent,
    ...options
  }: { Component?: React.ComponentType } & Pick<
    ServerRouterConfig,
    Exclude<keyof ServerRouterConfig, "routes">
  > = {}) => {
    const result = await makeServerApp({
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
    const ServerApp = Object.getOwnPropertyDescriptor(
      result,
      __THOU_SHALT_NOT_FAFF_AROUND_WITH_THIS_HERE_OBJECT_WE_ARE_SERIOUS__
    ).value
    return {
      ...result,
      ServerApp,
      wrapper: render(<ServerApp />),
    }
  }

  it("resolves with a rendered version of the ServerApp component", async () => {
    const { ServerApp, bodyHTML } = await getWrapper()
    expect(bodyHTML).toEqual(ReactDOMServer.renderToString(<ServerApp />))
  })

  it("bootstraps relay SSR data", async () => {
    const { scripts } = await getWrapper()
    expect(scripts).toContain("__RELAY_BOOTSTRAP__")
  })

  it("resolves with a 200 status if url matches request", async () => {
    const { status } = await getWrapper({ url: "/" })
    expect(status).toEqual(200)
  })

  it("resolves with a 404 status if url does not match request", async () => {
    const { status } = await getWrapper({ url: "/bad-url" })
    expect(status).toEqual(404)
  })

  it("passes items along in context option", async done => {
    const HomeApp = () => {
      return (
        <SystemContextConsumer>
          {context => {
            expect(Object.keys(context).sort()).toEqual([
              "foo",
              "mediator",
              "onlyMatchMediaQueries",
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
    expect(styleTags).toContain("style data-styled")
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
