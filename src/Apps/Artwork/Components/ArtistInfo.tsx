import {
  Button,
  EntityHeader,
  Flex,
  Sans,
  Spacer,
  StackableBorderBox,
} from "@artsy/palette"
import { ArtistInfo_artist } from "__generated__/ArtistInfo_artist.graphql"
import { ArtistInfoQuery } from "__generated__/ArtistInfoQuery.graphql"
import { SystemContextConsumer } from "Artsy"
import { Mediator } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"

import { ArtistBioFragmentContainer as ArtistBio } from "Components/ArtistBio"
import { ArtistMarketInsightsFragmentContainer as ArtistMarketInsights } from "Components/ArtistMarketInsights"
import { SelectedExhibitionFragmentContainer as SelectedExhibitions } from "Components/SelectedExhibitions"

import { AuthIntent, ContextModule } from "@artsy/cohesion"
import { MIN_EXHIBITIONS } from "Components/SelectedExhibitions"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import Events from "Utils/Events"
import { get } from "Utils/get"
import { openAuthToFollowSave } from "Utils/openAuthModal"

interface ArtistInfoProps {
  artist: ArtistInfo_artist
  mediator?: Mediator
}

interface ArtistInfoState {
  showArtistInsights: boolean
}

const Container = ({ children }) => (
  <StackableBorderBox p={2}>{children}</StackableBorderBox>
)

@track(
  {
    context_module: Schema.ContextModule.Biography,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class ArtistInfo extends Component<ArtistInfoProps, ArtistInfoState> {
  state = {
    showArtistInsights: false,
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheArtist,
    subject: Schema.Subject.ReadMore,
    type: Schema.Type.Button,
  })
  trackArtistBioReadMoreClick() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkAboutTheArtist,
    subject: Schema.Subject.ShowArtistInsights,
    type: Schema.Type.Button,
  })
  openArtistInsights() {
    this.setState({
      showArtistInsights: true,
    })
  }

  closeArtistInsights() {
    this.setState({
      showArtistInsights: false,
    })
  }

  handleOpenAuth = (mediator, artist) => {
    openAuthToFollowSave(mediator, {
      entity: artist,
      contextModule: ContextModule.aboutTheWork,
      intent: AuthIntent.followArtist,
    })
  }

  render() {
    const { artist } = this.props
    const { biographyBlurb, image, slug, internalID } = this.props.artist
    const showArtistBio = !!biographyBlurb.text
    const imageUrl = get(this.props, p => image.cropped.url)
    const showArtistInsightsButton =
      (artist.exhibition_highlights &&
        artist.exhibition_highlights.length >= MIN_EXHIBITIONS) ||
      (artist.auctionResultsConnection &&
        artist.auctionResultsConnection.edges.length > 0) ||
      (artist.collections && artist.collections.length > 0) ||
      (artist.highlights.partnersConnection &&
        artist.highlights.partnersConnection.edges.length > 0)
    const buttonText = this.state.showArtistInsights
      ? "Hide artist insights"
      : "Show artist insights"

    return (
      <SystemContextConsumer>
        {({ user, mediator }) => (
          <>
            <StackableBorderBox p={2} flexDirection="column">
              <EntityHeader
                name={this.props.artist.name}
                meta={this.props.artist.formatted_nationality_and_birthday}
                imageUrl={imageUrl}
                href={this.props.artist.href}
                FollowButton={
                  <FollowArtistButton
                    artist={this.props.artist}
                    user={user}
                    trackingData={{
                      modelName: Schema.OwnerType.Artist,
                      context_module: Schema.ContextModule.Biography,
                      entity_id: internalID,
                      entity_slug: slug,
                    }}
                    onOpenAuthModal={() =>
                      this.handleOpenAuth(mediator, this.props.artist)
                    }
                    render={({ is_followed }) => {
                      return (
                        <Sans
                          size="2"
                          weight="medium"
                          color="black"
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {is_followed ? "Following" : "Follow"}
                        </Sans>
                      )
                    }}
                  />
                }
              />
              {showArtistBio && (
                <>
                  <Spacer mb={1} />
                  <ArtistBio
                    bio={this.props.artist}
                    onReadMoreClicked={this.trackArtistBioReadMoreClick.bind(
                      this
                    )}
                  />
                </>
              )}
              {showArtistInsightsButton && (
                <Flex flexDirection="column" alignItems="flex-start">
                  <Button
                    onClick={
                      this.state.showArtistInsights
                        ? this.closeArtistInsights.bind(this)
                        : this.openArtistInsights.bind(this)
                    }
                    variant="secondaryGray"
                    size="small"
                    mt={1}
                  >
                    {buttonText}
                  </Button>
                </Flex>
              )}
            </StackableBorderBox>
            {this.state.showArtistInsights && (
              <>
                <ArtistMarketInsights
                  artist={this.props.artist}
                  border={false}
                  Container={Container}
                />
                <SelectedExhibitions
                  artistID={this.props.artist.internalID}
                  border={false}
                  totalExhibitions={this.props.artist.counts.partner_shows}
                  exhibitions={this.props.artist.exhibition_highlights}
                  ViewAllLink={
                    <a
                      href={`${sd.APP_URL}/artist/${this.props.artist.slug}/cv`}
                    >
                      View all
                    </a>
                  }
                  Container={Container}
                />
              </>
            )}
          </>
        )}
      </SystemContextConsumer>
    )
  }
}

// ADDED COLLECTIONS, HIGHLIGHTS, AND AUCTION RESULTS TO FRAGMENT FOR SHOW ARTIST INSIGHTS BUTTON VISIBLILITY CHECK

export const ArtistInfoFragmentContainer = createFragmentContainer(ArtistInfo, {
  artist: graphql`
    fragment ArtistInfo_artist on Artist
      @argumentDefinitions(
        partnerCategory: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
      internalID
      slug
      name
      href
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
      formatted_nationality_and_birthday: formattedNationalityAndBirthday
      counts {
        partner_shows: partnerShows
      }
      exhibition_highlights: exhibitionHighlights(size: 3) {
        ...SelectedExhibitions_exhibitions
      }
      collections
      highlights {
        partnersConnection(
          first: 10
          displayOnPartnerProfile: true
          representedBy: true
          partnerCategory: $partnerCategory
        ) {
          edges {
            node {
              __typename
            }
          }
        }
      }
      auctionResultsConnection(
        recordsTrusted: true
        first: 1
        sort: PRICE_AND_DATE_DESC
      ) {
        edges {
          node {
            __typename
          }
        }
      }
      ...ArtistBio_bio
      ...ArtistMarketInsights_artist
      ...FollowArtistButton_artist
      # The below data is only used to determine whether a section
      # should be rendered
      biographyBlurb: biographyBlurb(format: HTML, partnerBio: true) {
        text
      }
    }
  `,
})

export const ArtistInfoQueryRenderer = ({ artistID }: { artistID: string }) => {
  return (
    <SystemContextConsumer>
      {({ relayEnvironment }) => {
        return (
          <QueryRenderer<ArtistInfoQuery>
            environment={relayEnvironment}
            variables={{ artistID }}
            query={graphql`
              query ArtistInfoQuery($artistID: String!) {
                artist(id: $artistID) {
                  ...ArtistInfo_artist
                }
              }
            `}
            render={renderWithLoadProgress(ArtistInfoFragmentContainer)}
          />
        )
      }}
    </SystemContextConsumer>
  )
}
