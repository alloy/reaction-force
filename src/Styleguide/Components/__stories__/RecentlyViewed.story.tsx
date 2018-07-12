import { artworkBricks } from "Apps/__test__/Fixtures/Slider"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { RecentlyViewed } from "Styleguide/Components/RecentlyViewed"
import { Box } from "Styleguide/Elements/Box"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Components", module).add("Recently Viewed", () => {
  return (
    <React.Fragment>
      <Section title="Recently Viewed">
        <Box width="70%">
          <RecentlyViewed
            me={{
              recentlyViewedArtworks: {
                edges: artworkBricks,
              },
            }}
            useRelay={false}
          />
        </Box>
      </Section>
    </React.Fragment>
  )
})
