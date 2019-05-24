import { ArtworkImageBrowser_artwork } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { ArtworkImageBrowserQuery } from "__generated__/ArtworkImageBrowserQuery.graphql"
import { SystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import React, { useContext } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { ArtworkImageBrowser } from "./ArtworkImageBrowser"

export interface ImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export class ArtworkImageBrowserContainer extends React.Component<
  ImageBrowserProps
> {
  flickity = null

  render() {
    const { images, image, image_alt } = this.props.artwork
    if (!images.length) {
      return null
    }

    const defaultImageIndex = images.findIndex(e => e.id === image.id)
    return (
      <>
        <ArtworkImageBrowser
          setFlickityRef={f => (this.flickity = f)}
          images={images}
          imageAlt={image_alt}
        />
        <ArtworkActions
          selectDefaultSlide={() => {
            this.flickity.select(defaultImageIndex, false, true)
          }}
          artwork={this.props.artwork}
        />
      </>
    )
  }
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer<
  ImageBrowserProps
>(ArtworkImageBrowserContainer, {
  artwork: graphql`
    fragment ArtworkImageBrowser_artwork on Artwork {
      title
      image_alt: to_s
      image_title
      href

      ...ArtworkActions_artwork
      image {
        id
        url(version: "larger")
        height
        width
      }
      images {
        id
        uri: url(version: ["large"])
        placeholder: resized(width: 30, height: 30, version: "small") {
          url
        }
        aspectRatio: aspect_ratio
        is_zoomable
        is_default
        deepZoom: deep_zoom {
          Image {
            xmlns
            Url
            Format
            TileSize
            Overlap
            Size {
              Width
              Height
            }
          }
        }
      }
    }
  `,
})

export const ArtworkImageBrowserQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<ArtworkImageBrowserQuery>
      environment={relayEnvironment}
      variables={{ artworkID }}
      query={graphql`
        query ArtworkImageBrowserQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ArtworkImageBrowser_artwork
          }
        }
      `}
      render={renderWithLoadProgress(ArtworkImageBrowserFragmentContainer)}
    />
  )
}
