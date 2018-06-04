import React from "react"
import {
  ConnectionData,
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import styled from "styled-components"
import ArtworkGrid from "../ArtworkGrid"
import Spinner from "../Spinner"

export interface Props extends RelayProps {
  relay?: RelayPaginationProp
  tagID: string
}

export interface State {
  loading: boolean
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

const PageSize = 10

export class TagArtworksContent extends React.Component<Props, State> {
  private finishedPaginatingWithError = false

  state = {
    loading: false,
  }

  loadMoreArtworks() {
    const hasMore = this.props.filtered_artworks.artworks.pageInfo.hasNextPage
    const origLength = this.props.filtered_artworks.artworks.edges.length
    if (hasMore && !this.state.loading && !this.finishedPaginatingWithError) {
      this.setState({ loading: true }, () => {
        this.props.relay.loadMore(PageSize, error => {
          if (error) {
            console.error(error)
          }
          const newLength = this.props.filtered_artworks.artworks.edges.length
          const newHasMore = this.props.filtered_artworks.artworks.pageInfo
            .hasNextPage
          if (newLength - origLength < PageSize && newHasMore) {
            console.error(
              `Total count inconsistent with actual records returned for tag: ${
                this.props.tagID
              }`
            )
            this.finishedPaginatingWithError = true
          }
          this.setState({ loading: false })
        })
      })
    }
  }

  render() {
    return (
      <div>
        <ArtworkGrid
          artworks={this.props.filtered_artworks.artworks as any}
          columnCount={4}
          itemMargin={40}
          onLoadMore={() => this.loadMoreArtworks()}
        />
        <SpinnerContainer>
          {this.state.loading ? <Spinner /> : ""}
        </SpinnerContainer>
      </div>
    )
  }
}

export default createPaginationContainer(
  TagArtworksContent,
  {
    filtered_artworks: graphql`
      fragment TagArtworksContent_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(
          first: $count
          after: $cursor
          sort: $sort
        ) @connection(key: "TagArtworksContent_filtered_artworks") {
          pageInfo {
            hasNextPage
            endCursor
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
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.filtered_artworks.artworks as ConnectionData
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        cursor,
        filteredArtworksNodeID: props.filtered_artworks.__id,
      }
    },
    query: graphql`
      query TagArtworksContentQuery(
        $filteredArtworksNodeID: ID!
        $count: Int!
        $cursor: String
        $sort: String
      ) {
        node(__id: $filteredArtworksNodeID) {
          ...TagArtworksContent_filtered_artworks
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

export interface RelayProps {
  filtered_artworks: {
    artworks: {
      edges: Array<{}>
      pageInfo: {
        hasNextPage: boolean
      }
    }
  }
}
