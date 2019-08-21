import { Box, Spacer } from "@artsy/palette"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"

import { ArtworkFilterArtworkGrid2_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid2_filtered_artworks.graphql"
import { useSystemContext } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import { LoadingArea } from "../LoadingArea"
import { PaginationFragmentContainer as Pagination } from "../Pagination"
import { useArtworkFilterContext } from "./ArtworkFilterContext"
import { SortFilter } from "./ArtworkFilters/SortFilter"

interface ArtworkFilterArtworkGridProps {
  columnCount: number[]
  filtered_artworks: ArtworkFilterArtworkGrid2_filtered_artworks
  isLoading?: boolean
  relay: RelayRefetchProp
}

const ArtworkFilterArtworkGrid: React.FC<
  ArtworkFilterArtworkGridProps
> = props => {
  const { user, mediator } = useSystemContext()
  const context = useArtworkFilterContext()

  const {
    columnCount,
    filtered_artworks: { artworks },
  } = props

  const {
    pageInfo: { hasNextPage },
  } = artworks

  /**
   * Load next page of artworks
   */
  function loadNext() {
    if (hasNextPage) {
      loadPage(context.filters.page + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  function loadPage(page) {
    context.setFilter("page", page)
  }

  return (
    <>
      <SortFilter />
      <LoadingArea isLoading={props.isLoading}>
        <ArtworkGrid
          artworks={artworks as any}
          columnCount={columnCount}
          preloadImageCount={9}
          itemMargin={40}
          user={user}
          mediator={mediator}
          onClearFilters={context.resetFilters}
          emptyStateComponent={context.ZeroState && <context.ZeroState />}
          onBrickClick={artwork => {
            if (context.onArtworkBrickClick) {
              context.onArtworkBrickClick(artwork, props)
            }
          }}
        />

        <Spacer mb={3} />

        <Box>
          <Pagination
            hasNextPage={artworks.pageInfo.hasNextPage}
            pageCursors={artworks.pageCursors as any}
            onClick={(_cursor, page) => loadPage(page)}
            onNext={() => loadNext()}
            scrollTo="#jump--searchArtworkGrid"
          />
        </Box>
      </LoadingArea>
    </>
  )
}

export const ArtworkFilterArtworkGridRefetchContainer = createRefetchContainer(
  ArtworkFilterArtworkGrid,
  {
    filtered_artworks: graphql`
      fragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          after: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              __id
            }
          }
          ...ArtworkGrid_artworks
        }
      }
    `,
  },
  graphql`
    query ArtworkFilterArtworkGrid2Query(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...ArtworkFilterArtworkGrid2_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
