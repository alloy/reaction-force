import { AuctionResultsRefetchContainer_artist } from "__generated__/AuctionResultsRefetchContainer_artist.graphql"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { RelayPagination } from "Styleguide/Components/RelayPagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { AuctionResultItem } from "./AuctionResultItem"
import { TableColumns } from "./TableColumns"
import { TableSidebar } from "./TableSidebar"

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: AuctionResultsRefetchContainer_artist
}

export const AuctionResultsRefetchContainer = createRefetchContainer(
  class extends React.Component<AuctionResultsProps> {
    loadPrev = () => {
      const {
        startCursor,
        hasPreviousPage,
      } = this.props.artist.auctionResults.pageInfo

      if (hasPreviousPage) {
        this.loadBefore(startCursor)
      }
    }

    loadNext = () => {
      const {
        hasNextPage,
        endCursor,
      } = this.props.artist.auctionResults.pageInfo

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

    render() {
      return (
        <React.Fragment>
          <Row>
            <TableSidebar />

            <Col sm={10}>
              <Row>
                <TableColumns />
              </Row>

              <Box pt={0.5}>
                <Separator />
              </Box>

              {this.props.artist.auctionResults.edges.map(({ node }) => {
                return <AuctionResultItem {...node} />
              })}
            </Col>
          </Row>

          <Row>
            <Col>
              <Flex justifyContent="flex-end">
                <RelayPagination
                  pageCursors={
                    this.props.artist.auctionResults.pageCursors as any
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
    }
  },
  {
    artist: graphql`
      fragment AuctionResultsRefetchContainer_artist on Artist
        @argumentDefinitions(
          sort: { type: "AuctionResultSorts" }
          first: { type: "Int" }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        auctionResults(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
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
              title
              dimension_text
              organization
              images {
                thumbnail {
                  url
                }
              }
              description
              date_text
              sale_date_text
              price_realized {
                display
                cents_usd
              }
              estimate {
                display
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query AuctionResultsRefetchContainerQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $sort: AuctionResultSorts
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...AuctionResultsRefetchContainer_artist
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            sort: $sort
          )
      }
    }
  `
)
