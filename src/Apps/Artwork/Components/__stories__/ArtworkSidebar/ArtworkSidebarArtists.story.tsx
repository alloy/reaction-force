import {
  MultipleArtists,
  SingleFollowedArtist,
  SingleNonFollowedArtist,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/Artists"
import { ArtworkSidebarArtists as Artists } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Artwork/Sidebar", module).add("Artists", () => {
  return (
    <React.Fragment>
      <Section title="Single Followed Artist">
        <Artists artwork={{ artists: SingleFollowedArtist }} />
      </Section>
      <Section title="Single Not Followed Artist">
        <Artists artwork={{ artists: SingleNonFollowedArtist }} />
      </Section>
      <Section title="Multipe Artists">
        <Artists artwork={{ artists: MultipleArtists }} />
      </Section>
    </React.Fragment>
  )
})
