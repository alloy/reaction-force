import { mount } from "enzyme"
import React from "react"
import {
  ArtworkFilterContextProvider,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { ArtworkFilterMobileActionSheet } from "../ArtworkFilterMobileActionSheet"

describe("ArtworkFilterMobileActionSheet", () => {
  let context
  let spy

  const getWrapper = (props = {}) => {
    return mount(
      <ArtworkFilterContextProvider {...props}>
        <ArtworkFilterMobileActionSheetTest />
      </ArtworkFilterContextProvider>
    )
  }

  const ArtworkFilterMobileActionSheetTest = () => {
    context = useArtworkFilterContext()
    spy = jest.fn()

    return (
      <ArtworkFilterMobileActionSheet onClose={spy}>
        <div>found children</div>
      </ArtworkFilterMobileActionSheet>
    )
  }

  it("resets filters to defaults on `Reset` button click", () => {
    const wrapper = getWrapper({
      filters: {
        ...initialArtworkFilterState,
        page: 20,
      },
    })
    wrapper
      .find("Button")
      .first()
      .simulate("click")

    setTimeout(() => {
      expect(context.filters).toEqual(initialArtworkFilterState)
    })
  })

  it("calls onClose callback on `Apply` button click", () => {
    const wrapper = getWrapper()
    wrapper
      .find("Button")
      .last()
      .simulate("click")

    expect(spy).toHaveBeenCalled()
  })

  it("renders childrent content", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("found children")
  })
})
