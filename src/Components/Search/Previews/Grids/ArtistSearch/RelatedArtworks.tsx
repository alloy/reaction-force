import { Box, Flex, Sans, space } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "Utils/get"
import { Media, Responsive } from "Utils/Responsive"

import { RelatedArtworksPreview_viewer } from "__generated__/RelatedArtworksPreview_viewer.graphql"
import {
  SearchBarConsumer,
  SearchBarState,
} from "Components/Search/SearchBarContext"
import styled from "styled-components"
import { PreviewGridItemFragmentContainer as PreviewGridItem } from "../PreviewGridItem"
import { NoResultsPreview } from "./NoResults"

interface RelatedArtworksPreviewProps {
  viewer: RelatedArtworksPreview_viewer
  searchState?: SearchBarState
  smallScreen?: boolean
}

const ItemContainer = styled(Box)<{ itemsPerRow: 1 | 2 }>`
  &:nth-child(even) {
    margin-left: ${p => (p.itemsPerRow === 2 ? space(1) : 0)}px;
  }
`

export class RelatedArtworksPreview extends React.Component<
  RelatedArtworksPreviewProps
> {
  componentDidMount() {
    const { smallScreen } = this.props

    this.props.searchState.registerPreviewItems(
      smallScreen ? this.artworks.slice(0, 5) : this.artworks
    )
  }

  get artworks(): any {
    return get(
      this.props.viewer,
      x => x.filter_artworks.artworks_connection.edges,
      []
    ).map(x => x.node)
  }

  renderItems(itemsPerRow: 1 | 2) {
    const displayedArtworks =
      itemsPerRow === 1 ? this.artworks.slice(0, 5) : this.artworks

    const { searchState } = this.props

    return displayedArtworks.map((artwork, i) => (
      <ItemContainer width={["0%", "200px"]} key={i} itemsPerRow={itemsPerRow}>
        <PreviewGridItem
          artwork={artwork}
          highlight={
            searchState.hasEnteredPreviews &&
            i === searchState.selectedPreviewIndex
          }
          emphasizeArtist
          accessibilityLabel={`preview-${i.toLocaleString()}`}
        />
      </ItemContainer>
    ))
  }

  render() {
    if (this.artworks.length === 0) {
      return <NoResultsPreview />
    }

    return (
      <Box>
        <Sans size="3" weight="medium" color="black100" mb={1} ml={1}>
          Related Artworks
        </Sans>

        <Media lessThan="lg">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {this.renderItems(1)}
          </Flex>
        </Media>

        <Media greaterThan="md">
          <Flex alignItems="flex-start" flexWrap="wrap">
            {this.renderItems(2)}
          </Flex>
        </Media>
      </Box>
    )
  }
}

export const RelatedArtworksPreviewFragmentContainer = createFragmentContainer(
  (props: RelatedArtworksPreviewProps) => {
    return (
      <Responsive>
        {({ xs, sm, md }) => {
          return (
            <SearchBarConsumer>
              {(searchState: SearchBarState) => {
                return (
                  <RelatedArtworksPreview
                    searchState={searchState}
                    {...props}
                    smallScreen={xs || sm || md}
                  />
                )
              }}
            </SearchBarConsumer>
          )
        }}
      </Responsive>
    )
  },

  graphql`
    fragment RelatedArtworksPreview_viewer on Viewer
      @argumentDefinitions(entityID: { type: "String!" }) {
      filter_artworks(
        aggregations: [TOTAL]
        sort: "-decayed_merch"
        artist_id: $entityID
      ) {
        __id
        artworks_connection(first: 10) {
          edges {
            node {
              href
              ...PreviewGridItem_artwork
            }
          }
        }
      }
    }
  `
)
