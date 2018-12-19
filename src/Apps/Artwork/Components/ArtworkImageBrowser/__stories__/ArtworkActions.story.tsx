import { Flex } from "@artsy/palette"
import { ArtworkActionsFixture } from "Apps/__tests__/Fixtures/Artwork/ArtworkImageBrowser/ArtworkActions.fixture"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils"
import { ArtworkActions } from "../ArtworkActions"

storiesOf("Apps/Artwork Page/Components/ArtworkImageBrowser", module).add(
  "ArtworkActions",
  () => (
    <>
      <Section title="ArtworkActions">
        <Flex justifyContent="center" alignItems="flex-end" height="500px">
          <ArtworkActions artwork={ArtworkActionsFixture.artwork as any} />
        </Flex>
      </Section>
    </>
  )
)
