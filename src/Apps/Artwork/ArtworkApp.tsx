import { Box, Separator, Spacer } from "@artsy/palette"
import { ArtworkApp_artwork } from "__generated__/ArtworkApp_artwork.graphql"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { Col, Row } from "Styleguide/Elements/Grid"
import { HorizontalPadding } from "Styleguide/Utils/HorizontalPadding"
import { ArtistInfoQueryRenderer as ArtistInfo } from "./Components/ArtistInfo"

import { ArtworkBannerFragmentContainer as ArtworkBanner } from "./Components/ArtworkBanner"
import { ArtworkDetailsFragmentContainer as ArtworkDetails } from "./Components/ArtworkDetails"
import { ArtworkSidebarFragmentContainer as ArtworkSidebar } from "./Components/ArtworkSidebar"
import { ImageBrowserFragmentContainer as ImageBrowser } from "./Components/ImageBrowser"
import { OtherWorksFragmentContainer as OtherWorks } from "./Components/OtherWorks"

import {
  Footer,
  RecentlyViewedQueryRenderer as RecentlyViewed,
} from "Styleguide/Components"

export interface Props {
  artwork: ArtworkApp_artwork
}

export const ArtworkApp: React.SFC<Props> = props => {
  return (
    <HorizontalPadding>
      <Row>
        <Col sm={8}>
          <ArtworkBanner artwork={props.artwork} />
          <Spacer mb={4} />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <Box px={[0, 4]}>
            <ImageBrowser artwork={props.artwork} />
          </Box>
        </Col>
        <Col sm={4}>
          <ArtworkSidebar artwork={props.artwork} />
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <ArtworkDetails artwork={props.artwork} />
        </Col>
      </Row>
      {props.artwork.artist && (
        <Row>
          <Col sm={8}>
            <ArtistInfo artistID={props.artwork.artist.id} />
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Box mt={6}>
            <OtherWorks artwork={props.artwork} />
          </Box>
        </Col>
      </Row>

      {typeof window !== "undefined" && (
        <LazyLoadComponent threshold={1000}>
          <Row>
            <Col>
              <RecentlyViewed />
            </Col>
          </Row>
        </LazyLoadComponent>
      )}

      <Row>
        <Col>
          <Separator mt={6} mb={3} />
          <Footer />
        </Col>
      </Row>

      <div id="lightbox-container" />
    </HorizontalPadding>
  )
}

export const ArtworkAppFragmentContainer = createFragmentContainer(
  ArtworkApp,
  graphql`
    fragment ArtworkApp_artwork on Artwork {
      id
      artist {
        id
      }
      ...ArtworkBanner_artwork
      ...ArtworkSidebar_artwork
      ...ArtworkDetails_artwork
      ...ImageBrowser_artwork
      ...OtherWorks_artwork
    }
  `
)
