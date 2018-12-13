import { MockBoot, MockRelayRenderer, renderUntil } from "DevTools"
import React from "react"
import { Title } from "react-head"
import { graphql } from "react-relay"
import { Provider } from "unstated"

import { CollectAppFixture } from "../../__tests__/Fixtures/Collect/CollectAppFixture"
import { CollectAppFragmentContainer as CollectApp } from "../CollectApp"
import { FilterContainer } from "../Components/Filters"
import { BreadCrumbList } from "../Components/Seo"
import { FilterState } from "../FilterState"

jest.unmock("react-relay")

describe("CollectApp", () => {
  let filterState: FilterState = null

  beforeEach(() => {
    filterState = new FilterState({
      tracking: {
        trackEvent: jest.fn(),
      },
    })
  })

  it("renders a relay tree with SEO-friendly meta data", async () => {
    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(FilterContainer).length > 0
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={CollectApp}
            query={graphql`
              query CollectAppTestQuery {
                viewer {
                  ...CollectApp_viewer
                }
              }
            `}
            mockResolvers={{ Query: { viewer: () => CollectAppFixture } }}
          />
        </Provider>
      </MockBoot>
    )

    const title = tree.find(Title)
    expect(title.at(0).text()).toContain("Collect | Artsy")

    const breadCrumbList = tree.find(BreadCrumbList)
    expect(breadCrumbList.props().items).toEqual([
      { path: "/collect", name: "Collect" },
    ])
  })

  it("renders a relay tree with SEO-friendly meta data when medium param is present", async () => {
    const medium = "prints"

    const tree = await renderUntil(
      wrapper => {
        return wrapper.find(FilterContainer).length > 0
      },
      <MockBoot breakpoint="lg">
        <Provider inject={[filterState]}>
          <MockRelayRenderer
            Component={props => (
              <CollectApp {...{ params: { medium }, ...props }} />
            )}
            query={graphql`
              query CollectAppTestWithMediumQuery {
                viewer {
                  ...CollectApp_viewer
                }
              }
            `}
            mockResolvers={{ Query: { viewer: () => CollectAppFixture } }}
          />
        </Provider>
      </MockBoot>
    )

    const title = tree.find(Title)
    expect(title.at(0).text()).toContain("Prints for Sale | Collect on Artsy")

    const breadCrumbList = tree.find(BreadCrumbList)
    expect(breadCrumbList.props().items).toEqual([
      { path: "/collect", name: "Collect" },
      { path: `/collect/${medium}`, name: "Prints" },
    ])
  })
})
