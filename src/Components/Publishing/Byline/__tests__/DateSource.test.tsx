import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { cloneDeep, extend } from "lodash"
import { NewsArticle } from "../../Fixtures/Articles"
import { EditableChild } from "../../Fixtures/Helpers"
import { DateSource } from "../DateSource"
import { track } from "../../../../Utils/track"

jest.mock("../../../../Utils/track.ts", () => ({
  track: jest.fn(),
}))

describe("DateSource", () => {
  it("Renders children if present", () => {
    const component = mount(
      <DateSource article={NewsArticle} editSource={EditableChild("source")} />
    )
    expect(component.text()).toMatch("Child source")
  })

  it("Renders a source with link", () => {
    const article = extend(cloneDeep(NewsArticle))
    const component = mount(<DateSource article={NewsArticle} />)

    expect(component.text()).toMatch("via")
    expect(component.text()).toMatch("The New York Times")
    expect(component.html()).toMatch('href="http://nytimes.com"')
  })

  it("Renders a source with title only", () => {
    const article = extend(cloneDeep(NewsArticle), {
      news_source: { title: "The New York Times" },
    })
    const component = mount(<DateSource article={article} />)

    expect(component.find("a").length).toBe(0)
    expect(component.text()).toContain("via The New York Times")
  })

  it("does not render unnecessary text if it doesn't have a source", () => {
    const article = extend(cloneDeep(NewsArticle), { news_source: {} })
    const component = mount(<DateSource article={article} />)

    expect(component.html()).not.toContain("via")
  })

  describe("Analytics", () => {
    it("tracks news source link", () => {
      const component = mount(<DateSource article={NewsArticle} />)
      component
        .find("a")
        .at(0)
        .simulate("click")
      expect(
        track.mock.calls[0][0]({
          article: {
            news_source: { url: "http://artsy.net" },
          },
        })
      ).toEqual(
        expect.objectContaining({
          action: "Click",
          type: "external link",
          label: "news source",
          destination_path: "http://artsy.net",
        })
      )
    })
  })
})
