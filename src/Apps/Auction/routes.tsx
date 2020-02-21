import { ErrorPage } from "Components/ErrorPage"
import { RedirectException, RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import { confirmBidRedirect, Redirect, registerRedirect } from "./getRedirect"

import AuctionFAQ from "./Components/AuctionFAQ"
import ConfirmBidRoute from "./Routes/ConfirmBid"
import RegisterRoute from "./Routes/Register"

// import loadable from "@loadable/component"

const logger = createLogger("Apps/Auction/routes")

export const routes: RouteConfig[] = [
  {
    path: "/auction-faq",
    // getComponent: () => loadable(() => import("./Components/AuctionFAQ")),
    Component: AuctionFAQ,
    query: graphql`
      query routes_AuctionFAQQuery {
        viewer {
          ...AuctionFAQ_viewer
        }
      }
    `,
    fetchIndicator: "overlay",
  },
  {
    path: "/auction/:saleID/bid(2)?/:artworkID",
    // getComponent: () => loadable(() => import("./Routes/ConfirmBid")),
    Component: ConfirmBidRoute,
    render: ({ Component, props }) => {
      if (Component && props) {
        const { artwork, me, match } = props as any
        if (!artwork) {
          return <ErrorPage code={404} />
        }
        handleRedirect(
          confirmBidRedirect({ artwork, me }, match.location),
          match.location
        )
        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_ConfirmBidQuery($saleID: String!, $artworkID: String!)
        @raw_response_type {
        artwork(id: $artworkID) {
          internalID
          slug
          saleArtwork(saleID: $saleID) {
            internalID
            slug
            sale {
              internalID
              slug
              name
              isClosed
              isRegistrationClosed
              registrationStatus {
                internalID
                qualifiedForBidding
              }
            }
            ...LotInfo_saleArtwork
            ...BidForm_saleArtwork
          }
          ...LotInfo_artwork
        }
        me {
          internalID
          hasQualifiedCreditCards
          ...ConfirmBid_me
        }
      }
    `,
  },
  {
    path: "/auction-registration(2)?/:saleID",
    // getComponent: () => loadable(() => import("./Routes/Register")),
    Component: RegisterRoute,
    render: ({ Component, props }) => {
      if (Component && props) {
        const { match, sale, me } = props as any

        if (!sale) {
          return <ErrorPage code={404} />
        }

        handleRedirect(registerRedirect({ sale, me }), match.location)

        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_RegisterQuery($saleID: String!) @raw_response_type {
        sale(id: $saleID) @principalField {
          slug
          isAuction
          isRegistrationClosed
          isPreview
          isOpen
          isAuction
          registrationStatus {
            qualifiedForBidding
          }
          ...Register_sale
        }
        me {
          hasQualifiedCreditCards
          ...Register_me
        }
      }
    `,
  },
]

function handleRedirect(redirect: Redirect, location: Location) {
  if (redirect) {
    logger.warn(
      `Redirecting from ${location.pathname} to ${redirect.path} because '${redirect.reason}'`
    )

    // FIXME: Remove after A/B test completes
    if (getENV("EXPERIMENTAL_APP_SHELL")) {
      // Perform a hard jump to login page as it doesn't exist within router
      if (redirect.path.includes("/log_in?")) {
        window.location.href = redirect.path
      } else {
        throw new RedirectException(redirect.path)
      }
    } else {
      throw new RedirectException(redirect.path)
    }
  }
}
