import { EntityHeader, ReadMore, space } from "@artsy/palette"
import { CollectionDefaultHeaderFragmentContainer as CollectionDefaultHeader } from "Apps/Collect/Routes/Collection/Components/Header/DefaultHeader"
import { AnalyticsSchema } from "Artsy/Analytics"
import { unica } from "Assets/Fonts"
import { filter, take } from "lodash"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { slugify } from "underscore.string"
import { resize } from "Utils/resizer"
import { Responsive } from "Utils/Responsive"

import {
  Box,
  Col,
  color,
  Flex,
  Grid,
  media,
  Row,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"

import { AuthIntent, ContextModule } from "@artsy/cohesion"
import { Header_artworks } from "__generated__/Header_artworks.graphql"
import { Header_collection } from "__generated__/Header_collection.graphql"
import { useSystemContext } from "Artsy"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "Components/FollowButton/FollowArtistButton"
import { Link } from "found"
import { openAuthToFollowSave } from "Utils/openAuthModal"
import { FeaturedArtists } from "./FeaturedArtists"

export interface Props {
  collection: Header_collection
  artworks: Header_artworks
}

const handleOpenAuth = (mediator, artist) => {
  openAuthToFollowSave(mediator, {
    entity: artist,
    contextModule: ContextModule.featuredArtistsRail,
    intent: AuthIntent.followArtist,
  })
}

export const getFeaturedArtists = (
  artistsCount: number,
  collection: Header_collection,
  merchandisableArtists: Header_artworks["merchandisableArtists"]
): Header_artworks["merchandisableArtists"] => {
  if (collection.query.artistIDs.length > 0) {
    return filter(merchandisableArtists, artist =>
      collection.query.artistIDs.includes(artist.internalID)
    )
  }

  if (merchandisableArtists.length > 0) {
    const filteredArtistsIds = merchandisableArtists.filter(artist => {
      return !collection.featuredArtistExclusionIds.includes(artist.internalID)
    })
    return take(filteredArtistsIds, artistsCount)
  }
}

export const featuredArtistsEntityCollection: (
  artists: Header_artworks["merchandisableArtists"],
  mediator: any,
  user: any
) => JSX.Element[] = (artists, mediator, user) => {
  return artists.map((artist, index) => {
    const hasArtistMetaData = artist.nationality && artist.birthday
    return (
      <Box
        width={["100%", "33%", "33%", "25%"]}
        key={index}
        pb={20}
        data-test={ContextModule.featuredArtistsRail}
      >
        <EntityHeader
          imageUrl={artist.image.resized.url}
          name={artist.name}
          meta={
            hasArtistMetaData
              ? `${artist.nationality}, b. ${artist.birthday}`
              : undefined
          }
          href={`/artist/${artist.slug}`}
          FollowButton={
            <FollowArtistButton
              artist={artist}
              user={user}
              trackingData={{
                modelName: AnalyticsSchema.OwnerType.Artist,
                context_module:
                  AnalyticsSchema.ContextModule.CollectionDescription,
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
                    data-test="followArtistButton"
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
      </Box>
    )
  })
}

const maxChars = {
  xs: 350,
  sm: 730,
  md: 670,
  lg: 660,
  xl: 820,
}

const imageWidthSizes = {
  xs: 320,
  sm: 688,
  md: 820,
  lg: 944,
  xl: 1112,
}

const imageHeightSizes = {
  xs: 160,
  sm: 250,
}

const defaultHeaderImageHeight = {
  xs: 140,
  sm: 140,
  md: 220,
  lg: 220,
  xl: 220,
}

export const CollectionHeader: FC<Props> = ({ artworks, collection }) => {
  const { user, mediator } = useSystemContext()
  const hasMultipleArtists =
    artworks.merchandisableArtists && artworks.merchandisableArtists.length > 1

  const htmlUnsafeDescription = collection.description && (
    <span dangerouslySetInnerHTML={{ __html: collection.description }} />
  )

  return (
    <Responsive>
      {({ xs, sm, md, lg }) => {
        const size = xs ? "xs" : sm ? "sm" : md ? "md" : lg ? "lg" : "xl"
        const imageWidth = imageWidthSizes[size]
        const smallerScreen = xs || sm
        const imageHeight = smallerScreen
          ? imageHeightSizes.xs
          : imageHeightSizes.sm
        const chars = maxChars[size]
        const categoryTarget = `/collections#${slugify(collection.category)}`
        const artistsCount = xs ? 9 : 12
        const featuredArtists = featuredArtistsEntityCollection(
          getFeaturedArtists(
            artistsCount,
            collection,
            artworks.merchandisableArtists
          ),
          mediator,
          user
        )
        const resizedHeaderImage =
          collection.headerImage &&
          resize(collection.headerImage, {
            width: imageWidth * (xs ? 2 : 1),
            height: imageHeight * (xs ? 2 : 1),
            quality: 80,
            convert_to: "jpg",
          })

        return (
          <header>
            <Flex flexDirection="column">
              <Box mt={[0, "-12px"]}>
                {resizedHeaderImage ? (
                  <CollectionSingleImageHeader
                    position={["relative", "absolute"]}
                    left={["auto", 0]}
                    width={["auto", 1]}
                    p={2}
                    mt={0}
                    mb={3}
                    headerImageUrl={resizedHeaderImage}
                    height={imageHeight}
                    key="singleImageHeader"
                  >
                    <Overlay />
                    {collection.credit && (
                      <ImageCaption
                        dangerouslySetInnerHTML={{ __html: collection.credit }}
                      />
                    )}
                  </CollectionSingleImageHeader>
                ) : (
                  <CollectionDefaultHeader
                    headerArtworks={artworks}
                    defaultHeaderImageHeight={defaultHeaderImageHeight[size]}
                    collection_id={collection.id}
                    collection_slug={collection.slug}
                    key={collection.slug}
                  />
                )}
                <MetaContainer
                  mb={2}
                  mt={[
                    0,
                    imageHeightSizes.xs + space(3),
                    imageHeightSizes.sm + space(3),
                  ]}
                >
                  <BreadcrumbContainer size={["2", "3"]} mt={[2, 0]}>
                    <Link to="/collect">All works</Link> /{" "}
                    <Link to={categoryTarget}>{collection.category}</Link>
                  </BreadcrumbContainer>
                  <Spacer mt={1} />
                  <Serif size={["6", "10"]} element="h1">
                    {collection.title}
                  </Serif>
                </MetaContainer>
                <Grid>
                  <Row>
                    <Col sm="12" md="8">
                      <Flex>
                        <ExtendedSerif size="3">
                          {smallerScreen ? (
                            <ReadMore
                              maxChars={chars}
                              content={htmlUnsafeDescription || ""}
                            />
                          ) : (
                            htmlUnsafeDescription
                          )}
                          {collection.description && <Spacer mt={2} />}
                        </ExtendedSerif>
                      </Flex>
                    </Col>
                    <Col sm={12} md={12}>
                      {featuredArtists && hasMultipleArtists && (
                        <FeaturedArtists
                          breakpointSize={size}
                          featuredArtists={featuredArtists}
                          hasMultipleArtists={hasMultipleArtists}
                        />
                      )}
                    </Col>
                  </Row>
                </Grid>
                <Spacer mb={1} />
              </Box>
            </Flex>
            <Spacer mb={2} />
          </header>
        )
      }}
    </Responsive>
  )
}

const CollectionSingleImageHeader = styled(Box)<{
  headerImageUrl: string
  height: number
}>`
  position: relative;
  background: ${color("black30")};
  height: ${props => props.height}px;
  background-image: url(${props => props.headerImageUrl});
  background-size: cover;
  background-position: center;

  ${media.xs`
    margin-left: -20px;
    margin-right: -20px;
  `};
`
export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25)
  );
  z-index: 0;
`

const MetaContainer = styled(Box)`
  position: relative;
  z-index: 1;
`

const BreadcrumbContainer = styled(Sans)`
  a {
    text-decoration: none;
  }
`

const ImageCaption = styled(Box)`
  ${unica("s12")};
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  text-align: right;
  color: ${color("white100")};
  z-index: 7;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`

const ExtendedSerif = styled(Serif)`
  div span {
    span p {
      display: inline;
    }

    div p {
      display: inline;
      ${unica("s12")};
    }
  }
`

export const CollectionFilterFragmentContainer = createFragmentContainer(
  CollectionHeader,
  {
    collection: graphql`
      fragment Header_collection on MarketingCollection {
        category
        credit
        description
        featuredArtistExclusionIds
        headerImage
        id
        query {
          artistIDs
        }
        slug
        title
      }
    `,
    artworks: graphql`
      fragment Header_artworks on FilterArtworksConnection {
        ...DefaultHeader_headerArtworks
        merchandisableArtists {
          slug
          internalID
          name
          image {
            resized(width: 45, height: 45, version: "square") {
              url
            }
          }
          birthday
          nationality
          ...FollowArtistButton_artist
        }
      }
    `,
  }
)
