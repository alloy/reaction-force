import { Separator } from "@artsy/palette"
import { Box, Flex, Serif } from "@artsy/palette"
import { CollectApp_viewer } from "__generated__/CollectApp_viewer.graphql"
import React, { Component } from "react"
import { Title } from "react-head"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkGridFragmentContainer as ArtworkGrid } from "./Components/ArtworkGrid"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"

export interface CollectAppProps {
  name: string
  viewer?: CollectApp_viewer
}

export class CollectApp extends Component<CollectAppProps> {
  render() {
    return (
      <>
        <Title>Collect | Artsy</Title>
        <Flex flexDirection="column">
          <Box mt={3} mb={4}>
            <Serif size="8">Collect Art &amp; Design Online</Serif>
          </Box>
          <Box>
            <ArtworkGrid viewer={this.props.viewer} />
          </Box>

          {typeof window !== "undefined" && (
            <>
              <Separator my={6} />
              <LazyLoadComponent threshold={1000}>
                <RecentlyViewed />
              </LazyLoadComponent>
            </>
          )}

          <Separator mt={6} mb={3} />

          <Box>
            <Footer />
          </Box>
        </Flex>
      </>
    )
  }
}

export const CollectAppFragmentContainer = createFragmentContainer(
  CollectApp,
  graphql`
    fragment CollectApp_viewer on Viewer
      @argumentDefinitions(
        medium: { type: "String", defaultValue: "*" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MAJOR_PERIOD, MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
      ) {
      ...ArtworkGrid_viewer
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
        )
    }
  `
)
