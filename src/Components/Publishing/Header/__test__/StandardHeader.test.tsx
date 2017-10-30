import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { StandardArticle } from "../../Fixtures/Articles"
import { Header } from "../Header"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

describe("Standard Header", () => {
  it("renders standard header properly", () => {
    const header = renderer.create(<Header article={StandardArticle} />).toJSON()
    expect(header).toMatchSnapshot()
  })
  it("renders standard header with children properly", () => {
    const header = renderer
      .create(
      <Header article={StandardArticle}>
        <div>Child 0: Vertical</div>
        <div>Child 1: Title</div>
      </Header>
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })
})
