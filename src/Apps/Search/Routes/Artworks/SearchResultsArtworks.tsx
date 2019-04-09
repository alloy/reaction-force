import { Box, Spacer } from "@artsy/palette"
import { SearchResultsArtworks_viewer } from "__generated__/SearchResultsArtworks_viewer.graphql"
import { FilterState } from "Apps/Search/FilterState"
import { SearchResultsFilterFragmentContainer as ArtworkGrid } from "Apps/Search/Routes/Artworks/Components/Filter/SearchResultsFilterContainer"
import { Location } from "found"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Provider } from "unstated"

export interface Props {
  viewer: SearchResultsArtworks_viewer
  location: Location
}

export class SearchResultsArtworksRoute extends React.Component<Props> {
  render() {
    const { viewer, location } = this.props
    const { query } = location
    const { term } = query

    return (
      <Provider
        inject={[
          new FilterState({
            ...query,
            keyword: term,
          }),
        ]}
      >
        <Box>
          <Spacer mb={3} />
          <ArtworkGrid viewer={viewer} term={term} />
        </Box>
      </Provider>
    )
  }
}

export const SearchResultsArtworksRouteFragmentContainer = createFragmentContainer(
  SearchResultsArtworksRoute,
  graphql`
    fragment SearchResultsArtworks_viewer on Viewer
      @argumentDefinitions(
        keyword: { type: "String!", defaultValue: "" }
        medium: { type: "String" }
        major_periods: { type: "[String]" }
        partner_id: { type: "ID" }
        for_sale: { type: "Boolean" }
        at_auction: { type: "Boolean" }
        acquireable: { type: "Boolean" }
        offerable: { type: "Boolean" }
        inquireable_only: { type: "Boolean" }
        aggregations: {
          type: "[ArtworkAggregation]"
          defaultValue: [MEDIUM, TOTAL]
        }
        sort: { type: "String", defaultValue: "-partner_updated_at" }
        price_range: { type: "String" }
        height: { type: "String" }
        width: { type: "String" }
        artist_id: { type: "String" }
        attribution_class: { type: "String" }
        color: { type: "String" }
        page: { type: "Int" }
      ) {
      ...SearchResultsFilterContainer_viewer
        @arguments(
          medium: $medium
          major_periods: $major_periods
          partner_id: $partner_id
          for_sale: $for_sale
          sort: $sort
          acquireable: $acquireable
          offerable: $offerable
          at_auction: $at_auction
          inquireable_only: $inquireable_only
          price_range: $price_range
          height: $height
          width: $width
          artist_id: $artist_id
          attribution_class: $attribution_class
          color: $color
          keyword: $keyword
          page: $page
        )
    }
  `
)
