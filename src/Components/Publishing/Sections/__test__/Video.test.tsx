import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { Videos } from "../../Fixtures/Components"
import { Video } from "../Video"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

it("renders properly", () => {
  const video = renderer.create(<Video section={Videos[0]} />).toJSON()
  expect(video).toMatchSnapshot()
})
