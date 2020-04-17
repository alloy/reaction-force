import { AuthIntent, ContextModule } from "@artsy/cohesion"
import { Box, EntityHeader, Sans, Spacer } from "@artsy/palette"
import { RecommendedArtist_artist } from "__generated__/RecommendedArtist_artist.graphql"
import { SystemContext } from "Artsy"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import FillwidthItem from "Components/Artwork/FillwidthItem"
import { ArrowButton, Carousel } from "Components/Carousel"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import React, { FC, useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "Utils/get"
import { openAuthToFollowSave } from "Utils/openAuthModal"

interface RecommendedArtistProps {
  artist: RecommendedArtist_artist
}
const HEIGHT = 150

const handleOpenAuth = (mediator, artist) => {
  openAuthToFollowSave(mediator, {
    entity: artist,
    contextModule: ContextModule.relatedArtistsRail,
    intent: AuthIntent.followArtist,
  })
}

@track({
  context_module: Schema.ContextModule.RecommendedArtists,
})
class RecommendedArtistWithTracking extends React.Component<
  RecommendedArtistProps
> {
  @track({
    type: Schema.Type.Thumbnail,
    action_type: Schema.ActionType.Click,
  })
  trackArtworkClicked() {
    // noop
  }

  render() {
    return (
      <RecommendedArtist
        {...this.props}
        onArtworkClicked={this.trackArtworkClicked.bind(this)}
      />
    )
  }
}

const RecommendedArtist: FC<RecommendedArtistProps & {
  onArtworkClicked: () => void
}> = ({ artist, onArtworkClicked }) => {
  const { user, mediator } = useContext(SystemContext)
  const artistData = get(
    artist,
    a => a.artworks_connection.edges,
    []
  ) as object[]

  return (
    <>
      <EntityHeader
        mt={4}
        imageUrl={get(artist, a => a.image.cropped.url, "")}
        name={artist.name}
        meta={artist.formatted_nationality_and_birthday}
        href={artist.href}
        FollowButton={
          <FollowArtistButton
            artist={artist}
            user={user}
            trackingData={{
              modelName: Schema.OwnerType.Artist,
              context_module: Schema.ContextModule.RecommendedArtists,
              entity_id: artist.internalID,
              entity_slug: artist.slug,
            }}
            onOpenAuthModal={() => handleOpenAuth(mediator, artist)}
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

      <Spacer mb={3} />

      <Carousel
        height="240px"
        data={artistData}
        options={{ pageDots: false }}
        render={artwork => {
          const aspect_ratio = get(artwork, a => a.node.image.aspect_ratio, 1)
          return (
            <FillwidthItem
              artwork={artwork.node}
              contextModule={ContextModule.relatedArtistsRail}
              targetHeight={HEIGHT}
              imageHeight={HEIGHT}
              width={HEIGHT * aspect_ratio}
              margin={10}
              user={user}
              mediator={mediator}
              onClick={onArtworkClicked}
              lazyLoad
            />
          )
        }}
        renderLeftArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              <Arrow />
            </ArrowContainer>
          )
        }}
        renderRightArrow={({ Arrow }) => {
          return (
            <ArrowContainer>
              <Arrow />
            </ArrowContainer>
          )
        }}
      />
    </>
  )
}

const ArrowContainer = styled(Box)`
  align-self: flex-start;

  ${ArrowButton} {
    height: 60%;
  }
`

export const RecommendedArtistFragmentContainer = createFragmentContainer(
  RecommendedArtistWithTracking,
  {
    artist: graphql`
      fragment RecommendedArtist_artist on Artist {
        slug
        internalID
        name
        formatted_nationality_and_birthday: formattedNationalityAndBirthday
        href
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
        artworks_connection: artworksConnection(
          first: 20
          sort: PUBLISHED_AT_DESC
          filter: IS_FOR_SALE
        ) {
          edges {
            node {
              id
              image {
                aspect_ratio: aspectRatio
              }
              ...FillwidthItem_artwork
            }
          }
        }
        ...FollowArtistButton_artist
      }
    `,
  }
)
