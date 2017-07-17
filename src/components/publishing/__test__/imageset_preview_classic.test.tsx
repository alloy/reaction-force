import ImageSetPreviewClassic from "../imageset_preview_classic"
import { Images } from "./fixtures"

import * as React from "react"
import * as renderer from "react-test-renderer"

it("renders properly", () => {
  const imageset = renderer.create(<ImageSetPreviewClassic images={Images} />).toJSON()
  expect(imageset).toMatchSnapshot()
})
