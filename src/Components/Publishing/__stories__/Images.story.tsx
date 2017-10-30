import { storiesOf } from "@storybook/react"
import PropTypes from "prop-types"
import React from "react"
import { Artwork } from "../Sections/Artwork"
import { FullscreenViewer } from "../Sections/FullscreenViewer/FullscreenViewer"
import { Image } from "../Sections/Image"
import { ImageCollection } from "../Sections/ImageCollection"

import { Artworks, Images, ImagesNarrow } from "../Fixtures/Components"

class ImageCollectionDemo extends React.Component<any, any> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { viewerIsOpen: false, slideIndex: 0 }
  }

  getChildContext() {
    return { onViewFullscreen: this.openViewer }
  }

  openViewer = index => {
    this.setState({
      viewerIsOpen: true,
      slideIndex: index,
    })
  }

  closeViewer = () => {
    this.setState({ viewerIsOpen: false })
  }

  render() {
    return (
      <div>
        <div style={{ width: "100%" }}>
          <ImageCollection images={Images} targetHeight={400} gutter={10} />
        </div>
        <div style={{ width: 780 }}>
          <ImageCollection images={ImagesNarrow} targetHeight={400} gutter={10} />
        </div>
        <FullscreenViewer
          onClose={this.closeViewer}
          show={this.state.viewerIsOpen}
          slideIndex={this.state.slideIndex}
          images={Images}
        />
      </div>
    )
  }
}

storiesOf("Publishing/Images", module)
  .add("Artwork", () => {
    return (
      <div>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[0]} />
        </div>
        <hr />
        <p>Multiple Artists: </p>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[1]} />
        </div>
        <hr />
        <p>Unlinked: </p>
        <div style={{ width: 800 }}>
          <Artwork linked={false} artwork={Artworks[1]} />
        </div>
        <hr />
        <p>Missing info: </p>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[2]} />
        </div>
        <hr />
        <p>Small: </p>
        <div style={{ width: 400 }}>
          <Artwork artwork={Artworks[1]} />
        </div>
        <hr />
        <p>Fillwidth: </p>
        <div style={{ width: "100%" }}>
          <Artwork artwork={Artworks[1]} sectionLayout="fillwidth" />
        </div>
        <hr />
        <p>Classic: </p>
        <div style={{ width: 800 }}>
          <Artwork artwork={Artworks[0]} layout="classic" />
        </div>
      </div>
    )
  })
  .add("Image", () => {
    return (
      <div>
        <p>Standard:</p>
        <div style={{ width: 400 }}>
          <Image image={Images[1]} />
        </div>
        <p>Long Caption:</p>
        <div style={{ width: 400 }}>
          <Image image={Images[2]} />
        </div>
        <p>With Child as Caption:</p>
        <div style={{ width: 400 }}>
          <Image image={Images[2]}>
            <div>
              <p>A React child as caption.</p>
            </div>
          </Image>
        </div>
        <p>Fillwidth:</p>
        <div style={{ width: "100%" }}>
          <Image image={Images[2]} sectionLayout="fillwidth" />
        </div>
        <p>Classic:</p>
        <div style={{ width: 400 }}>
          <Image layout="classic" image={Images[2]} />
        </div>
      </div>
    )
  })
  .add("Image Collection", () => {
    return <ImageCollectionDemo />
  })
