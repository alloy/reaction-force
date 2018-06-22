import { RelatedArtistsRefetchContainer_artist } from "__generated__/RelatedArtistsRefetchContainer_artist.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtistCard } from "Styleguide/Components/ArtistCard"
import { RelayPagination } from "Styleguide/Components/RelayPagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Styleguide/Utils/Responsive"

interface ShowProps {
  relay: RelayRefetchProp
  artist: RelatedArtistsRefetchContainer_artist
  kind: string
}

export const PAGE_SIZE = 6

export const RelatedArtistsRefetchContainer = createRefetchContainer(
  class extends React.Component<ShowProps> {
    loadPrev = () => {
      const {
        startCursor,
        hasPreviousPage,
      } = this.props.artist.related.artists.pageInfo
      if (hasPreviousPage) {
        this.loadBefore(startCursor)
      }
    }

    loadNext = () => {
      const {
        hasNextPage,
        endCursor,
      } = this.props.artist.related.artists.pageInfo
      if (hasNextPage) {
        this.loadAfter(endCursor)
      }
    }

    loadBefore(cursor) {
      this.props.relay.refetch(
        {
          first: null,
          before: cursor,
          artistID: this.props.artist.id,
          after: null,
          last: PAGE_SIZE,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }
        }
      )
    }

    loadAfter = cursor => {
      this.props.relay.refetch(
        {
          first: PAGE_SIZE,
          after: cursor,
          artistID: this.props.artist.id,
          before: null,
          last: null,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }
        }
      )
    }

    renderPagination() {
      return (
        <div>
          <RelayPagination
            pageCursors={this.props.artist.related.artists.pageCursors as any}
            onClick={this.loadAfter}
            onNext={this.loadNext}
            onPrev={this.loadPrev}
          />
        </div>
      )
    }

    render() {
      return (
        <Responsive>
          {({ xs, sm, md }) => {
            let width
            if (xs) {
              width = "100%"
            } else if (sm || md) {
              width = "33%"
            } else {
              width = "25%"
            }

            return (
              <React.Fragment>
                <Row>
                  <Col>
                    <Flex flexWrap>
                      {this.props.artist.related.artists.edges.map(
                        ({ node }) => {
                          return (
                            <Box p={1} width={width}>
                              <ArtistCard
                                src={node.image.cropped.url}
                                headline={node.name}
                                subHeadline={
                                  node.formatted_nationality_and_birthday
                                }
                              />
                            </Box>
                          )
                        }
                      )}
                    </Flex>
                  </Col>
                </Row>

                <Box py={2}>
                  <Separator />
                </Box>

                <Row>
                  <Col>
                    <Flex justifyContent="flex-end">
                      <RelayPagination
                        pageCursors={
                          this.props.artist.related.artists.pageCursors as any
                        }
                        onClick={this.loadAfter}
                        onNext={this.loadNext}
                        onPrev={this.loadPrev}
                      />
                    </Flex>
                  </Col>
                </Row>
              </React.Fragment>
            )
          }}
        </Responsive>
      )
    }
  },
  {
    artist: graphql`
      fragment RelatedArtistsRefetchContainer_artist on Artist
        @argumentDefinitions(
          first: { type: "Int" }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          kind: { type: "RelatedArtistsKind" }
        ) {
        id
        related {
          artists(
            first: $first
            after: $after
            before: $before
            last: $last
            kind: $kind
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            pageCursors {
              ...RelayPagination_pageCursors
            }
            edges {
              node {
                name
                image {
                  cropped(width: 400, height: 300) {
                    url
                  }
                }
                formatted_nationality_and_birthday
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query RelatedArtistsRefetchContainerQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $kind: RelatedArtistsKind
    ) {
      artist(id: $artistID) {
        ...RelatedArtistsRefetchContainer_artist
          @arguments(
            kind: $kind
            first: $first
            last: $last
            after: $after
            before: $before
          )
      }
    }
  `
)
