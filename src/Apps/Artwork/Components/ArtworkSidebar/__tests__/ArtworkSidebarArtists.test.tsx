import { ArtworkSidebarArtists_Test_QueryRawResponse } from "__generated__/ArtworkSidebarArtists_Test_Query.graphql"
import {
  CulturalMakerWork,
  MultipleArtists,
  SingleFollowedArtist,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarArtistsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { Mediator, SystemContextProvider } from "Artsy"
import { FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { renderRelayTree } from "DevTools"
import React from "react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtworkSidebarArtists", () => {
  let mediator: Mediator
  beforeEach(() => {
    mediator = { trigger: jest.fn() }
    Object.defineProperty(window, "location", {
      writable: true,
      value: { assign: jest.fn() },
    })
  })

  const getWrapper = async (
    response: ArtworkSidebarArtists_Test_QueryRawResponse["artwork"] = SingleFollowedArtist,
    context = { mediator, user: null }
  ) => {
    return await renderRelayTree({
      Component: ({ artwork }: any) => {
        return (
          <SystemContextProvider {...context}>
            <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ArtworkSidebarArtists_Test_Query @raw_response_type {
          artwork(id: "josef-albers-homage-to-the-square-85") {
            ...ArtworkSidebarArtists_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarArtists_Test_QueryRawResponse,
    })
  }

  let wrapper

  describe("ArtworkSidebarArtists with one artist", () => {
    beforeEach(async () => {
      wrapper = await getWrapper()
    })

    it("displays artist name for single artist", () => {
      expect(wrapper.html()).toContain("Josef Albers")
      expect(wrapper.find({ href: "/artist/josef-albers" }).length).toBe(1)
    })

    it("renders artist follow button for single artist", () => {
      expect(wrapper.find(FollowArtistButton)).toHaveLength(1)
      expect(wrapper.find(FollowArtistButton).text()).not.toMatch("Following")
    })

    it("Opens auth with expected args when following an artist", () => {
      wrapper
        .find(FollowArtistButton)
        .at(0)
        .simulate("click")
      expect(mediator.trigger).toBeCalledWith("open:auth", {
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: "josef-albers",
        },
        contextModule: "artworkSidebar",
        copy: "Sign up to follow Josef Albers",
        intent: "followArtist",
        mode: "signup",
      })
    })
  })

  describe("ArtworkSidebarArtists with multiple artists", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(MultipleArtists)
    })

    it("displays artist names for multiople artists", () => {
      expect(wrapper.html()).toContain("Josef Albers")
      expect(
        wrapper.find({
          href: "/artist/josef-albers",
        }).length
      ).toBe(1)
      expect(wrapper.html()).toContain("Ed Ruscha")
      expect(
        wrapper.find({
          href: "/artist/ed-ruscha",
        }).length
      ).toBe(1)
    })

    it("does not display follow buttons", () => {
      expect(wrapper.html()).not.toContain(FollowArtistButton)
    })

    it("separates artist names by comma", () => {
      expect(wrapper.text()).toBe("Josef Albers, Ed Ruscha")
    })
  })

  describe("ArtworkSidebarArtists with cultural maker work", () => {
    beforeAll(async () => {
      wrapper = await getWrapper(CulturalMakerWork)
    })

    it("displays cultural maker", () => {
      expect(wrapper.html()).toContain("American 18th Century")
    })
  })
})
