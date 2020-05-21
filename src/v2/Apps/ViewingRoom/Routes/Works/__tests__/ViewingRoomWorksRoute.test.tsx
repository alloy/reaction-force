import React from "react"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { ViewingRoomWorksRoute_Test_QueryRawResponse } from "v2/__generated__/ViewingRoomWorksRoute_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { ViewingRoomWorksRouteFragmentContainer } from "../../Works/ViewingRoomWorksRoute"

jest.unmock("react-relay")
jest.mock("Artsy/Analytics/useTracking")
jest.mock("Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
}))

describe("ViewingRoomWorksRoute", () => {
  const slug = "subscription-demo-gg-guy-yanai"

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: ViewingRoomWorksRoute_Test_QueryRawResponse = ViewingRoomWorksRouteFixture
  ) => {
    return await renderRelayTree({
      Component: ({ viewingRoom }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <ViewingRoomWorksRouteFragmentContainer viewingRoom={viewingRoom} />
          </MockBoot>
        )
      },
      query: graphql`
        query ViewingRoomWorksRoute_Test_Query($slug: ID!) @raw_response_type {
          viewingRoom(id: $slug) {
            ...ViewingRoomWorksRoute_viewingRoom
          }
        }
      `,
      variables: {
        slug,
      },
      mockData: response,
    })
  }

  it("renders the correct components", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ViewingRoomCarousel").length).toBe(2)
    expect(wrapper.find("ViewingRoomArtworkDetails").length).toBe(2)
  })

  describe("ViewingRoomCarousel", () => {
    let wrapper

    beforeEach(async () => {
      wrapper = (await getWrapper()).find("ViewingRoomCarousel").first()
    })

    it("renders correct components", () => {
      expect(wrapper.find("Carousel").length).toBe(1)
      expect(wrapper.find("Image").length).toBe(3)
      expect(wrapper.find("Arrow").length).toBe(2)
      expect(wrapper.find("ProgressBar").length).toBe(1)
    })
  })

  describe("ViewingRoomArtworkDetails", () => {
    const trackEvent = jest.fn()
    let wrapper

    beforeEach(async () => {
      wrapper = (await getWrapper()).find("ViewingRoomArtworkDetails").first()
      const mockTracking = useTracking as jest.Mock
      mockTracking.mockImplementation(() => {
        return {
          trackEvent,
        }
      })
    })

    it("displays correct text", () => {
      const html = wrapper.html()
      expect(html).toContain("Bill Miles")
      expect(html).toContain("Beep Beep")
      expect(html).toContain("2015")
      expect(html).toContain("some description")
      expect(html).toContain("$500")
    })

    it("displays a buy button", () => {
      expect(wrapper.find("Button").length).toBe(1)
      expect(wrapper.html()).toContain('href="/artwork/bill-miles-beep-beep')
    })

    it("tracks clicks", () => {
      wrapper.find("RouterLink").simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "clickedBuyViewingRoom",
        context_module: "viewingRoomArtworkRail",
        destination_path: "/artwork/bill-miles-beep-beep",
        subject: "Rail",
      })
    })
  })
})

const ViewingRoomWorksRouteFixture: ViewingRoomWorksRoute_Test_QueryRawResponse = {
  viewingRoom: {
    artworksConnection: {
      edges: [
        {
          node: {
            internalID: "5de6b49aa665fc000db78197",
            images: [
              {
                internalID: "5de6b49b7bc07c0013d44b5d",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95fc5c74214001104a724",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95fcdc74214001104a726",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
            ],
            id: "QXJ0d29yazo1ZGU2YjQ5YWE2NjVmYzAwMGRiNzgxOTc=",
            artistNames: "Bill Miles",
            title: "Beep Beep",
            date: "2015",
            additionalInformation: "some description",
            saleMessage: "$500",
            href: "/artwork/bill-miles-beep-beep",
          },
        },
        {
          node: {
            internalID: "5de6b3a46882b7000eee31f8",
            images: [
              {
                internalID: "5de6b3a4a665fc000db78117",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95f3ec74214001104a71d",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95f45b5fef100123a168f",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
              {
                internalID: "5eb95f46c74214001104a720",
                resized: {
                  width: 500,
                  height: 500,
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/1xRLCisVngeUx0aiAfsP3Q/large.jpg",
                },
              },
            ],
            id: "QXJ0d29yazo1ZGU2YjNhNDY4ODJiNzAwMGVlZTMxZjg=",
            artistNames: "Emma Johnson",
            title: "Please Do Not Touch",
            date: "2018",
            additionalInformation: "some description",
            saleMessage: "Contact for price",
            href: "/artwork/emma-johnson-please-do-not-touch",
          },
        },
      ],
    },
  },
}
