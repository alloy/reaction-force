import { storiesOf } from "@storybook/react"
import React from "react"

import SelectableLink from "../SelectableLink"

storiesOf("Onboarding", module).add("SelectableLink", () => {
  return (
    <div style={{ width: "400px" }}>
      <SelectableLink text="Buy Art & Design" onSelect={selected => selected} />
    </div>
  )
})
