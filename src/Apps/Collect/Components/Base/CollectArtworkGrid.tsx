import { Box, Spacer } from "@artsy/palette"
import { ArtworkFilterArtworkGrid_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { FilterState } from "Apps/Collect/FilterState"
import { SystemContextConsumer } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"
import createLogger from "Utils/logger"

const logger = createLogger("CollectArtworkGrid.tsx")

interface Props {
  columnCount: number | number[]
  filters?: any
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  isLoading?: boolean
  relay: RelayRefetchProp
}

const PAGE_SIZE = 30

class CollectArtworkGrid extends Component<Props, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = (filters: FilterState) => {
    const {
      filtered_artworks: {
        artworks: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor, filters.state.page + 1, filters)
    }
  }

  loadAfter = (cursor, page, filters: FilterState) => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        filteredArtworksNodeID: this.props.filtered_artworks.__id,
      },
      null,
      error => {
        this.toggleLoading(false)
        filters.setPage(page)

        if (error) {
          logger.error(error)
        }
      }
    )
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  render() {
    const {
      columnCount,
      filtered_artworks: { artworks },
    } = this.props
    const isLoading = this.state.isLoading || this.props.isLoading

    return (
      <SystemContextConsumer>
        {({ user, mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <LoadingArea isLoading={isLoading}>
                    <ArtworkGrid
                      artworks={artworks as any}
                      columnCount={columnCount}
                      preloadImageCount={9}
                      itemMargin={40}
                      user={user}
                      mediator={mediator}
                      onClearFilters={filters.resetFilters}
                    />

                    <Spacer mb={3} />

                    <Box>
                      <Pagination
                        hasNextPage={artworks.pageInfo.hasNextPage}
                        pageCursors={artworks.pageCursors as any}
                        onClick={(cursor, page) => {
                          this.loadAfter(cursor, page, filters)
                        }}
                        onNext={() => {
                          this.loadNext(filters)
                        }}
                        scrollTo="#jump--collectArtworkGrid"
                      />
                    </Box>
                  </LoadingArea>
                )
              }}
            </Subscribe>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const CollectArtworkGridRefreshContainer = createRefetchContainer(
  CollectArtworkGrid,
  {
    filtered_artworks: graphql`
      fragment CollectArtworkGrid_filtered_artworks on FilterArtworks
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
          ...ArtworkGrid_artworks
          edges {
            node {
              __id
            }
          }
        }
      }
    `,
  },
  graphql`
    query CollectArtworkGridQuery(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...CollectArtworkGrid_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
