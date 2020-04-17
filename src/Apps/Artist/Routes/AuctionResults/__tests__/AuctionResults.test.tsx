import { AuctionResults_Test_QueryRawResponse } from "__generated__/AuctionResults_Test_Query.graphql"
import { AuctionResultsFixture } from "Apps/__tests__/Fixtures/Artist/Routes/AuctionResultsFixture"
import { AuctionResultsRouteFragmentContainer as AuctionResultsRoute } from "Apps/Artist/Routes/AuctionResults"
import { MockBoot, renderRelayTree } from "DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Breakpoint } from "Utils/Responsive"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("AuctionResults", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: AuctionResultsRoute,
      query: graphql`
        query AuctionResults_Test_Query($artistID: String!) @raw_response_type {
          artist(id: $artistID) {
            ...AuctionResults_artist
          }
        }
      `,
      mockData: AuctionResultsFixture as AuctionResults_Test_QueryRawResponse,
      variables: {
        artistID: "pablo-picasso",
      },
      wrapper: children => (
        <MockBoot breakpoint={breakpoint}>{children}</MockBoot>
      ),
    })
  }

  const trackEvent = jest.fn()
  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })
  afterEach(() => {
    trackEvent.mockReset()
  })

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders proper elements", () => {
      expect(wrapper.find("SelectSmall").length).toBe(1)
      expect(wrapper.find("Pagination").length).toBe(1)
      expect(wrapper.find("ArtistAuctionResultItem").length).toBe(10)
    })

    it("renders the proper count", () => {
      expect(wrapper.html()).toContain("Showing 830 results")
    })

    it("renders proper select options", () => {
      const html = wrapper.find("SelectSmall").html()
      expect(html).toContain("Most recent")
      expect(html).toContain("Estimate")
      expect(html).toContain("Sale price")
    })

    describe("collapsed details", () => {
      it("opens the collapse", () => {
        wrapper
          .find("ArrowDownIcon")
          .first()
          .simulate("click")
        wrapper.update()
        const html = wrapper.html()
        const data =
          AuctionResultsFixture.artist.auctionResultsConnection.edges[0].node
        expect(html).toContain("Artwork Info")
        expect(html).toContain(data.dimension_text)
        expect(html).toContain(data.description)
      })
    })

    describe("user interactions", () => {
      const defaultRelayParams = {
        first: 10,
        after: null,
        artistID: "pablo-picasso",
        organizations: [],
        sort: "DATE_DESC",
      }
      let refetchSpy
      beforeEach(async () => {
        wrapper = await getWrapper()
        refetchSpy = jest.spyOn(
          (wrapper.find("AuctionResultsContainer").props() as any).relay,
          "refetch"
        )
      })
      describe("pagination", () => {
        it("triggers relay refetch with after", () => {
          const pagination = wrapper.find("Pagination")

          pagination
            .find("button")
            .at(1)
            .simulate("click")
          expect(refetchSpy).toHaveBeenCalledTimes(1)
          expect(refetchSpy.mock.calls[0][0]).toEqual(
            expect.objectContaining({
              ...defaultRelayParams,
              after: "YXJyYXljb25uZWN0aW9uOjk=",
            })
          )
        })
      })
      describe("filters", () => {
        describe("medium filter", () => {
          it("triggers relay refetch with medium list", done => {
            const filter = wrapper.find("MediumFilter")

            const checkboxes = filter.find("Checkbox")

            checkboxes.at(1).simulate("click")

            checkboxes.at(2).simulate("click")

            checkboxes.at(1).simulate("click")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(3)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  categories: ["Work on Paper"],
                })
              )
              expect(refetchSpy.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  categories: ["Work on Paper", "Sculpture"],
                })
              )
              expect(refetchSpy.mock.calls[2][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  categories: ["Sculpture"],
                })
              )

              expect(trackEvent).toHaveBeenCalledTimes(3)
              expect(trackEvent.mock.calls[0][0]).toEqual({
                action_type: "Auction results filter params changed",
                context_page: "Artist Auction Results",
                changed: { categories: ["Work on Paper"] },
                current: {
                  categories: ["Work on Paper"],
                  page: 1,
                  sort: "DATE_DESC",
                  organizations: [],
                  sizes: [],
                  createdAfterYear: 1880,
                  createdBeforeYear: 1973,
                  earliestCreatedYear: 1880,
                  latestCreatedYear: 1973,
                  allowEmptyCreatedDates: true,
                },
              })
              done()
            })
          })
        })
        describe("auction house filter", () => {
          // TODO: Re-enable once we uncollapse auction house filters
          it.skip("triggers relay refetch with organization list", done => {
            const filter = wrapper.find("AuctionHouseFilter")

            const checkboxes = filter.find("Checkbox")

            checkboxes.at(1).simulate("click")

            checkboxes.at(2).simulate("click")

            checkboxes.at(1).simulate("click")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(3)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  organizations: ["Christie's"],
                })
              )
              expect(refetchSpy.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  organizations: ["Christie's", "Phillips"],
                })
              )
              expect(refetchSpy.mock.calls[2][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  organizations: ["Phillips"],
                })
              )
              done()
            })
          })
        })
        describe("size filter", () => {
          it("triggers relay refetch with size list and tracks events", done => {
            const filter = wrapper.find("SizeFilter")

            const checkboxes = filter.find("Checkbox")

            checkboxes.at(1).simulate("click")

            checkboxes.at(2).simulate("click")

            checkboxes.at(1).simulate("click")

            setTimeout(() => {
              expect(refetchSpy).toHaveBeenCalledTimes(3)

              expect(refetchSpy.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  sizes: ["MEDIUM"],
                })
              )
              expect(refetchSpy.mock.calls[1][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  sizes: ["MEDIUM", "LARGE"],
                })
              )
              expect(refetchSpy.mock.calls[2][0]).toEqual(
                expect.objectContaining({
                  ...defaultRelayParams,
                  sizes: ["LARGE"],
                })
              )

              expect(trackEvent).toHaveBeenCalledTimes(3)
              expect(trackEvent.mock.calls[0][0]).toEqual({
                action_type: "Auction results filter params changed",
                context_page: "Artist Auction Results",
                changed: { sizes: ["MEDIUM"] },
                current: {
                  sizes: ["MEDIUM"],
                  page: 1,
                  sort: "DATE_DESC",
                  organizations: [],
                  categories: [],
                  createdAfterYear: 1880,
                  createdBeforeYear: 1973,
                  earliestCreatedYear: 1880,
                  latestCreatedYear: 1973,
                  allowEmptyCreatedDates: true,
                },
              })

              done()
            })
          })
        })
        describe("year created filter", () => {
          const value = v => ({ target: { value: `${v}` } })
          it("triggers relay refetch with created years and tracks events", () => {
            const filter = wrapper.find("YearCreated")
            const selects = filter.find("select")

            act(() => {
              selects.at(0).simulate("change", value(1900))
              selects.at(1).simulate("change", value(1960))
            })

            expect(refetchSpy).toHaveBeenCalledTimes(2)

            expect(refetchSpy.mock.calls[1][0]).toEqual(
              expect.objectContaining({
                ...defaultRelayParams,
                createdAfterYear: 1900,
                createdBeforeYear: 1960,
                earliestCreatedYear: 1880,
                latestCreatedYear: 1973,
              })
            )
          })
        })
      })

      describe("sort", () => {
        it("triggers relay refetch with correct params", done => {
          const sort = wrapper.find("SortSelect SelectSmall")

          sort
            .find("option")
            .at(1)
            .simulate("change")

          setTimeout(() => {
            expect(refetchSpy).toHaveBeenCalledTimes(1)
            expect(refetchSpy.mock.calls[0][0]).toEqual(
              expect.objectContaining({
                ...defaultRelayParams,
                sort: "ESTIMATE_AND_DATE_DESC",
              })
            )
            done()
          })
        })
      })
    })
  })
})
