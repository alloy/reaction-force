import { CollectionHubFixture } from "Apps/__tests__/Fixtures/Collections"
import { useTracking } from "Artsy/Analytics/useTracking"
import { ArrowButton } from "Components/v2/Carousel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { OtherCollectionsRail } from "../index"

jest.mock("Artsy/Analytics/useTracking")

describe("CollectionsRail", () => {
  let props
  const trackEvent = jest.fn()

  beforeEach(() => {
    props = {
      collectionGroup: CollectionHubFixture.linkedCollections[0],
    }
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const memberData = () => {
    return {
      description:
        "<p>From SpongeBob SquarePants to Snoopy, many beloved childhood cartoons have made an impact on the history of art.</p>",
      price_guidance: 60,
      slug: "art-inspired-by-cartoons",
      thumbnail: "http://files.artsy.net/images/cartoons_thumbnail.png",
      title: "Art Inspired by Cartoons",
    }
  }

  it("Renders expected fields", () => {
    const component = mount(<OtherCollectionsRail {...props} />)

    expect(component.text()).toMatch("Other Collections")
    expect(component.text()).toMatch("Artist Posters")
    expect(component.text()).toMatch("Artist Skateboard Decks")
    expect(component.text()).toMatch("KAWS: Bearbricks")
  })

  it("Renders no arrows when there are less than 5 collections", () => {
    const component = mount(<OtherCollectionsRail {...props} />)
    expect(component.find(ArrowButton).length).toBe(1)
  })

  describe("Tracking", () => {
    it("Tracks impressions", () => {
      mount(<OtherCollectionsRail {...props} />)

      expect(trackEvent).toBeCalledWith({
        action_type: "Impression",
        context_page: "Collection",
        context_module: "OtherCollectionsRail",
        context_page_owner_type: "Collection",
      })
    })

    it("Tracks arrow click", () => {
      props.collectionGroup.members = [
        memberData(),
        memberData(),
        memberData(),
        memberData(),
        memberData(),
      ]

      const component = mount(<OtherCollectionsRail {...props} />)

      component
        .find(ArrowButton)
        .at(1)
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        context_page: "Collection",
        context_module: "OtherCollectionsRail",
        context_page_owner_type: "Collection",
        type: "Button",
        subject: "clicked next button",
      })
    })
  })
})
