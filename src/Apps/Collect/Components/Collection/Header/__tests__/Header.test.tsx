import { EntityHeader } from "@artsy/palette"
import { shallow } from "enzyme"
import React from "react"
import { CollectionHeader, getFeaturedArtists } from "../index"

describe("collections header", () => {
  const props = {
    artworks: {
      " $refType": null,
      merchandisable_artists: [
        {
          id: "kaws",
          _id: "4e934002e340fa0001005336",
          name: "KAWS",
          imageUrl:
            "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
          birthday: "1974",
          nationality: "American",
          " $fragmentRefs": null,
        },
        {
          id: "robert-lazzarini",
          _id: "4f5f64c23b555230ac0003ae",
          name: "Robert Lazzarini",
          imageUrl:
            "https://d32dm0rphc51dk.cloudfront.net/1npk1i_Xua5q8Hv0YOq_3g/square.jpg",
          birthday: "1965",
          nationality: "American",
          " $fragmentRefs": null,
        },
        {
          id: "medicom",
          _id: "58fe85ee275b2450a0fd2b51",
          name: "Medicom",
          imageUrl:
            "https://d32dm0rphc51dk.cloudfront.net/jUMOidRmCQ0RyynXM_sFzQ/square.jpg",
          birthday: "",
          nationality: "",
          " $fragmentRefs": null,
        },
        {
          id: "medicom-toy-slash-china",
          _id: "5b9821af86c8aa21d364dde5",
          name: "Medicom Toy/China",
          imageUrl:
            "https://d32dm0rphc51dk.cloudfront.net/npEmyaOeaPzkfEHX5VsmQg/square.jpg",
          birthday: "",
          nationality: "",
          " $fragmentRefs": null,
        },
      ],
    },
    collection: {
      title: "KAWS: Toys",
      category: "Collectible Sculptures",
      slug: "kaws-toys",
      headerImage:
        "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
      query: {
        gene_id: null,
        artist_id: null,
        artist_ids: ["4e934002e340fa0001005336"],
      },
    },
  }
  describe("getFeaturedArtists", () => {
    const mockMediator = jest.fn()

    it("returns the queried artists when there is explicit artist_ids", () => {
      const { collection, artworks } = props
      const results = getFeaturedArtists(
        9,
        collection,
        true,
        artworks.merchandisable_artists,
        mockMediator,
        {}
      )

      expect(results.length).toEqual(1)
    })

    it("passes correct arguments featuredArtistsEntityCollection", () => {
      const { collection, artworks } = props

      const wrapper = shallow(
        <div>
          {getFeaturedArtists(
            9,
            collection,
            true,
            artworks.merchandisable_artists,
            mockMediator,
            {}
          )}
        </div>
      )

      const entities = wrapper.find(EntityHeader)
      expect(entities.length).toBe(1)

      const artist = entities.at(0).props().FollowButton.props.artist
      expect(artist).toMatchObject({
        id: "kaws",
        _id: "4e934002e340fa0001005336",
        name: "KAWS",
        imageUrl:
          "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
        birthday: "1974",
        nationality: "American",
      })
    })
  })

  describe("collection meta data", () => {
    it("renders the title", () => {
      const component = shallow(<CollectionHeader {...props} />)

      expect(component.find("MetaContainer").text()).toContain("KAWS: Toys")
    })
    //   it("renders a header image", () => {})
    //   it("renders description if it exists", () => {})
    //   it("does not render a description if it doesn't exist", () => {})
    //   it("renders breadcrumb category", () => {})
    // })

    // describe("collection header featured artists rail", () => {
    //   it("renders featured artists when featured artists exist", () => {})
    //   it("does not render featured artists when they don't exist", () => {})
  })
})
