import React, { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCarousel_artwork } from "__generated__/ViewingRoomCarousel_artwork.graphql"
import { Carousel } from "Components/Carousel"
import { flowRight } from "lodash"

import {
  Flex,
  ChevronIcon,
  Box,
  Image,
  ProgressBar,
  breakpoints,
} from "@artsy/palette"

interface ViewingRoomCarouselProps {
  artwork: ViewingRoomCarousel_artwork
}

const ViewingRoomCarousel: React.FC<ViewingRoomCarouselProps> = ({
  artwork: { images },
}) => {
  const computeScrollPercent = selectedIndex =>
    ((selectedIndex + 1) / images.length) * 100
  const [scrollPercent, setScrollPercent] = useState(computeScrollPercent(0))
  const update = flowRight(setScrollPercent, computeScrollPercent)
  const showProgressBar = images.length > 1

  return (
    <Box width="100%">
      <Flex
        height={550}
        maxWidth={breakpoints.lg}
        m="auto"
        my={2}
        position="relative"
      >
        <Carousel
          options={{
            cellAlign: "center",
            draggable: showProgressBar,
            freeScroll: true,
            groupCells: 1,
            pageDots: false,
          }}
          data={images}
          height="550px"
          onDragEnd={({ flickity }) => update(flickity.selectedIndex)}
          render={({ imageHref, internalID }) => {
            return (
              <Box key={internalID}>
                <Image height={550} src={imageHref} />
              </Box>
            )
          }}
          renderLeftArrow={({ currentSlideIndex, flickity }) => {
            const opacity = currentSlideIndex === 0 ? 0 : 1
            return (
              <Arrow
                direction="left"
                opacity={opacity}
                onClick={() => {
                  flickity.previous()
                  update(flickity.selectedIndex)
                }}
              />
            )
          }}
          renderRightArrow={({ currentSlideIndex, flickity }) => {
            const opacity = currentSlideIndex === images.length - 1 ? 0 : 1
            return (
              <Arrow
                direction="right"
                opacity={opacity}
                onClick={() => {
                  flickity.next()
                  update(flickity.selectedIndex)
                }}
              />
            )
          }}
        />
      </Flex>

      {showProgressBar && (
        <Box width="50%" m="auto">
          <ProgressBar
            highlight="black100"
            percentComplete={scrollPercent}
            transition="width .30s ease-out"
          />
        </Box>
      )}
    </Box>
  )
}

export const ViewingRoomCarouselFragmentContainer = createFragmentContainer(
  ViewingRoomCarousel,
  {
    artwork: graphql`
      fragment ViewingRoomCarousel_artwork on Artwork {
        images {
          internalID
          imageHref: url(version: ["large"])
        }
      }
    `,
  }
)

const Arrow: React.FC<{
  direction: "left" | "right"
  onClick: () => void
  opacity: number
}> = ({ direction, onClick, opacity }) => {
  const position = { [direction]: 0 }

  return (
    <Flex
      alignItems="center"
      display={["none", "inherit"]}
      height="100%"
      justifyContent="center"
      onClick={() => onClick()}
      position="absolute"
      width={50}
      style={{
        transition: "opacity .2s ease-out",
        backgroundColor: "rgba(255,255,255,.95)",
        cursor: opacity ? "pointer" : "inherit",
        zIndex: 1,
        opacity,
        ...position,
      }}
    >
      <ChevronIcon direction={direction} />
    </Flex>
  )
}
