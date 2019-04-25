import {
  BarChart,
  BarDescriptor,
  BorderBox,
  Flex,
  Link,
  Sans,
  Spacer,
} from "@artsy/palette"
import { PricingContext_artwork } from "__generated__/PricingContext_artwork.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { once } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import Waypoint from "react-waypoint"
import Events from "Utils/Events"
import { createCollectUrl } from "./../Utils/createCollectUrl"
import { PricingContextModal } from "./PricingContextModal"

interface PricingContextProps {
  artwork: PricingContext_artwork
}

@track(
  {
    context_module: Schema.ContextModule.PriceContext,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class PricingContext extends React.Component<PricingContextProps> {
  openCollectPage(minCents, maxCents, category, widthCm, heightCm, artistId) {
    const url = createCollectUrl({
      minCents,
      maxCents,
      category,
      widthCm,
      heightCm,
      artistId,
    })

    if (typeof window !== "undefined") {
      return this.openWindow.bind(this, url)
    }
  }

  @track({
    action_type: Schema.ActionType.Impression,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
  })
  trackImpression() {
    // noop
  }

  @track({
    action_type: Schema.ActionType.Click,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
  })
  openWindow(url) {
    window.open(url)
  }

  @track({
    action_type: Schema.ActionType.Hover,
    flow: Schema.Flow.ArtworkPriceContext,
    subject: Schema.Subject.HistogramBar,
    type: Schema.Type.Chart,
  })
  barchartHover() {
    // I'm just for tracking!
  }

  // TODO: Investigate why metaphysics is returning null instead of zero for minPrice
  render() {
    const { artwork } = this.props

    if (!artwork.pricingContext) {
      return null
    }

    const priceCents = artwork.priceCents.max || artwork.priceCents.min

    return (
      <BorderBox mb={2} flexDirection="column">
        <Waypoint onEnter={once(this.trackImpression.bind(this))} />
        <Flex>
          <Sans size="2" weight="medium">
            {artwork.pricingContext.appliedFiltersDisplay}
          </Sans>
          <PricingContextModal />
        </Flex>
        <Link color="black60">
          <Sans size="2">Browse works in the category</Sans>
        </Link>
        <Spacer mb={[2, 3]} />
        <BarChart
          minLabel={
            artwork.pricingContext.bins[0].minPrice != null
              ? artwork.pricingContext.bins[0].minPrice
              : "$0"
          }
          maxLabel={
            artwork.pricingContext.bins[artwork.pricingContext.bins.length - 1]
              .maxPrice + "+"
          }
          bars={artwork.pricingContext.bins.map(
            (bin): BarDescriptor => {
              const binMinPrice = bin.minPrice != null ? bin.minPrice : "$0"
              const title = `${binMinPrice}–${bin.maxPrice}`
              const artworkFallsInThisBin =
                priceCents >= bin.minPriceCents &&
                priceCents < bin.maxPriceCents

              const binValue =
                artworkFallsInThisBin && bin.numArtworks === 0
                  ? 1
                  : bin.numArtworks
              const labelSuffix = binValue === 1 ? " work" : " works"
              return {
                value: binValue,
                label: {
                  title,
                  description: binValue + labelSuffix,
                },
                onClick: this.openCollectPage(
                  bin.minPriceCents,
                  bin.maxPriceCents,
                  artwork.category,
                  artwork.widthCm,
                  artwork.heightCm,
                  artwork.artists[0].id
                ),
                onHover: this.barchartHover.bind(this),
                highlightLabel: artworkFallsInThisBin
                  ? {
                      title,
                      description: "This work",
                    }
                  : undefined,
              }
            }
          )}
        />
      </BorderBox>
    )
  }
}

export const PricingContextFragmentContainer = createFragmentContainer(
  PricingContext,
  {
    artwork: graphql`
      fragment PricingContext_artwork on Artwork {
        priceCents {
          min
          max
        }
        artists {
          id
        }
        widthCm
        heightCm
        category
        pricingContext @include(if: $enablePricingContext) {
          appliedFiltersDisplay
          bins {
            maxPrice
            maxPriceCents
            minPrice
            minPriceCents
            numArtworks
          }
        }
      }
    `,
  }
)

PricingContextFragmentContainer.displayName = "PricingContext"
