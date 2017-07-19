import { storiesOf } from "@storybook/react"
import * as React from "react"

import Artwork from "../artwork"
import FeatureHeader from "../feature_header"
import IconImageset from "../icons/icon_imageset"
import Image from "../image"
import ImageCollection from "../image_collection"
import ImagesetPreview from "../imageset_preview"
import ImagesetPreviewClassic from "../imageset_preview_classic"

import { FeatureHeaders, Images, ImageSetFull, ImageSetMini } from "../__test__/fixtures"

import Typography from "./typography"

storiesOf("Publishing", Artwork)
  .add("Artwork", () => {
    return (
      <div style={{ width: 400 }}>
        <Artwork linked artwork={Images[0]} />
      </div>
    )
  })
  .add("Icons", () => {
    return (
      <div style={{ width: 45 }}>
        <IconImageset />
        <p>Imageset</p>
      </div>
    )
  })
  .add("Image", () => {
    return (
      <div>
        <div style={{ width: 400 }}>
          <Image image={Images[1]} />
        </div>
        <div style={{ width: 400 }}>
          <Image image={Images[2]} />
        </div>
      </div>
    )
  })
<<<<<<< HEAD
  .add("Imageset Preview - Classic", () => {
    return <ImagesetPreviewClassic images={Images} />
  })
  .add("Imageset Preview", () => {
    return (
      <div style={{ maxWidth: 680, width: "100%" }}>
        <ImagesetPreview section={ImageSetFull} />
        <br />
        <ImagesetPreview section={ImageSetMini} />
=======
  .add("Image Collection", () => {
    return (
      <div>
        <ImageCollection images={Images} />
>>>>>>> 6bad1cf... Adds image collection component and starts fillwidth by extracting dimensions
      </div>
    )
  })
  .add("Feature Header - Text", () => {
    return (
      <div style={{ width: "100vw", position: "relative" }}>
        <FeatureHeader header={FeatureHeaders[0]} />
      </div>
    )
  })
  .add("Feature Header - Split", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <FeatureHeader header={FeatureHeaders[1]} />
      </div>
    )
  })
  .add("Feature Header - Full", () => {
    return (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <FeatureHeader header={FeatureHeaders[2]} />
      </div>
    )
  })
  .add("Typography", () => {
    return <Typography />
  })
