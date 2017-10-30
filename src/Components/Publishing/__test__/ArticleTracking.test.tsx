import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import Events from "../../../Utils/Events"
import { Article } from "../Article"
import { articleFullHref } from "../Constants"
import { StandardArticle } from "../Fixtures/Articles"

jest.mock("react-slick", () => {
  const React = require("react")
  return props => <div>{props.children}</div>
})
jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("emits analytics events to an event emitter", done => {
  const article = mount(<Article article={StandardArticle} />)
  Events.onEvent(data => {
    expect(data.action).toEqual("Article share")
    done()
  })
  const shareUrl = articleFullHref(StandardArticle.slug)
  const fbURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
  article.find(`[href='${fbURL}']`).first().simulate("click")
})
