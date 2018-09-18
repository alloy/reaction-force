import { ArtistArtworksFilters } from "__generated__/WorksForYouQuery.graphql"
import { WorksForYouQuery } from "__generated__/WorksForYouQuery.graphql"
import { MarketingHeader } from "Apps/WorksForYou/Components/MarketingHeader"
import { ContextConsumer, ContextProps } from "Artsy"
import { track } from "Artsy/Analytics"
import Spinner from "Components/Spinner"
import React, { Component } from "react"
import { graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import Events from "Utils/Events"
import WorksForYouArtist from "./WorksForYouArtist"
import WorksForYouContent from "./WorksForYouContents"

export interface Props extends ContextProps {
  artistID?: string
  forSale?: boolean
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class WorksForYou extends Component<Props> {
  static defaultProps = {
    forSale: true,
    artistID: "",
  }

  render() {
    const { artistID, forSale } = this.props
    const includeSelectedArtist = !!artistID
    const filter: ArtistArtworksFilters[] = forSale ? ["IS_FOR_SALE"] : null

    return (
      <ContextConsumer>
        {({ relayEnvironment, user }) => {
          return (
            <QueryRenderer<WorksForYouQuery>
              environment={relayEnvironment}
              query={graphql`
                query WorksForYouQuery(
                  $includeSelectedArtist: Boolean!
                  $artistID: String!
                  $forSale: Boolean
                  $filter: [ArtistArtworksFilters]
                ) {
                  viewer {
                    ...WorksForYouContents_viewer
                      @skip(if: $includeSelectedArtist)
                      @arguments(for_sale: $forSale)
                    ...WorksForYouArtist_viewer
                      @include(if: $includeSelectedArtist)
                      @arguments(artistID: $artistID, filter: $filter)
                  }
                }
              `}
              variables={{ artistID, includeSelectedArtist, forSale, filter }}
              render={({ props }) => {
                const hasBuyNowLabFeature = true
                // user &&
                // user.lab_features &&
                // user.lab_features.includes("New Buy Now Flow")
                console.log(user)
                if (props) {
                  return (
                    <>
                      {hasBuyNowLabFeature && <MarketingHeader />}

                      {includeSelectedArtist ? (
                        <WorksForYouArtist
                          artistID={this.props.artistID}
                          viewer={props.viewer}
                          forSale={forSale}
                          user={user}
                        />
                      ) : (
                        <WorksForYouContent user={user} viewer={props.viewer} />
                      )}
                    </>
                  )
                } else {
                  return (
                    <SpinnerContainer>
                      <Spinner />
                    </SpinnerContainer>
                  )
                }
              }}
            />
          )
        }}
      </ContextConsumer>
    )
  }
}
