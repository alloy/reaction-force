import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Elements", module).add("Spacer", () => {
  return (
    <Section title="Spacer">
      <div>A Spacer component...</div>
      <Spacer my={3} />
      <div>...spaces content.</div>
    </Section>
  )
})
