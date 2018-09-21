import { Box, Spacer } from "@artsy/palette"
import { ArtworkFilterArtworkGrid_filtered_artworks } from "__generated__/ArtworkFilterArtworkGrid_filtered_artworks.graphql"
import { FilterState } from "Apps/Artist/Routes/Overview/state"
import { ContextConsumer } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer as Pagination } from "Styleguide/Components"
import { Subscribe } from "unstated"

import {
  LoadingArea,
  LoadingAreaState,
} from "Apps/Artist/Components/LoadingArea"

interface Props {
  artistID: string
  columnCount: number
  filters: any
  filtered_artworks: ArtworkFilterArtworkGrid_filtered_artworks
  isLoading?: boolean
  relay: RelayRefetchProp
}

const PAGE_SIZE = 10

class Artworks extends Component<Props, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = (filters, mediator) => {
    const {
      filtered_artworks: {
        artworks: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor, filters.state.page + 1, filters, mediator)
    }
  }

  loadAfter = (cursor, page, filters, mediator) => {
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
        filters.setPage(page, mediator)
        if (error) {
          console.error(error)
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
    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <LoadingArea
                    isLoading={this.state.isLoading || this.props.isLoading}
                  >
                    <ArtworkGrid
                      artworks={this.props.filtered_artworks.artworks}
                      columnCount={this.props.columnCount}
                      itemMargin={40}
                      user={user}
                      mediator={mediator}
                    />

                    <Spacer mb={3} />

                    <Box>
                      <Pagination
                        hasNextPage={
                          this.props.filtered_artworks.artworks.pageInfo
                            .hasNextPage
                        }
                        pageCursors={
                          this.props.filtered_artworks.artworks.pageCursors
                        }
                        onClick={(cursor, page) => {
                          this.loadAfter(cursor, page, filters, mediator)
                        }}
                        onNext={() => {
                          this.loadNext(filters, mediator)
                        }}
                        scrollTo="#jump--artistArtworkGrid"
                      />
                    </Box>
                  </LoadingArea>
                )
              }}
            </Subscribe>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const ArtworkGridRefetchContainer = createRefetchContainer(
  Artworks,
  {
    filtered_artworks: graphql`
      fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
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
    query ArtworkFilterArtworkGridQuery(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...ArtworkFilterArtworkGrid_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)
