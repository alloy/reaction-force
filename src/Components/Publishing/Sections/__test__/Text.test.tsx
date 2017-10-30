import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { SectionText } from "../../Fixtures/Components"
import { Text } from "../Text"

it("renders classic text properly", () => {
  const text = renderer.create(<Text html={SectionText.classic} layout="classic" />).toJSON()
  expect(text).toMatchSnapshot()
})

it("renders feature text properly", () => {
  const text = renderer.create(<Text html={SectionText.feature} layout="feature" />).toJSON()
  expect(text).toMatchSnapshot()
})

it("renders standard text properly", () => {
  const text = renderer.create(<Text html={SectionText.standard} layout="standard" />).toJSON()
  expect(text).toMatchSnapshot()
})
