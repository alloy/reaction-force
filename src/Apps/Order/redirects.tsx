import { routes_OrderQueryResponse } from "__generated__/routes_OrderQuery.graphql"
import { Location, RedirectException, RouteConfig, Router } from "found"
import moment from "moment"
import { get } from "Utils/get"
import { OrderApp } from "./OrderApp"

const LEAVE_MESSAGING =
  "Are you sure you want to refresh? Your changes will not be saved."

export const confirmRouteExit = (
  newLocation: Location,
  oldLocation: Location,
  router: Router
) => {
  // Refresh -- On refresh newLocation is null
  if (!newLocation || newLocation.pathname === oldLocation.pathname) {
    // Most browsers will ignore this and supply their own messaging for refresh
    return LEAVE_MESSAGING
  }

  // Attempting to navigate to another route in the orders app
  const match = router.matcher.match(newLocation)
  if (match) {
    const matchedRoutes: RouteConfig[] | null = router.matcher.getRoutes(match)
    if (matchedRoutes && matchedRoutes[0].Component === OrderApp) {
      return undefined
    }
  }

  return LEAVE_MESSAGING
}

type RedirectPredicate = (
  args: {
    order: routes_OrderQueryResponse["order"]
  }
) => string | void

interface RedirectRecord {
  path: string
  rules: RedirectPredicate[]
  children?: RedirectRecord[]
}

const goToStatusIf = (
  pred: (order: routes_OrderQueryResponse["order"]) => boolean
): RedirectPredicate => ({ order }) => {
  if (pred(order)) {
    return `/orders/${order.id}/status`
  }
}

const goToArtworkIfOrderWasAbandoned: RedirectPredicate = ({ order }) => {
  if (order.state === "ABANDONED") {
    const artworkID = get(order, o => o.lineItems.edges[0].node.artwork.id)
    // If an artwork ID can't be found, redirect back to home page.
    return artworkID ? `/artwork/${artworkID}` : "/"
  }
}

const goToStatusIfOrderIsNotPending = goToStatusIf(
  order => order.state !== "PENDING"
)

const goToShippingIfShippingIsNotCompleted: RedirectPredicate = ({ order }) => {
  if (!order.requestedFulfillment) {
    return `/orders/${order.id}/shipping`
  }
}

const goToPaymentIfPaymentIsNotCompleted: RedirectPredicate = ({ order }) => {
  if (!order.creditCard) {
    return `/orders/${order.id}/payment`
  }
}

const goToShippingIfOrderIsNotOfferOrder: RedirectPredicate = ({ order }) => {
  if (order.mode !== "OFFER") {
    return `/orders/${order.id}/shipping`
  }
}

const goToOfferIfNoOfferMade: RedirectPredicate = ({ order }) => {
  if (order.mode === "OFFER" && !order.myLastOffer) {
    return `/orders/${order.id}/offer`
  }
}

const goToStatusIfNotOfferOrder = goToStatusIf(order => order.mode !== "OFFER")

const goToStatusIfNotAwaitingBuyerResponse = goToStatusIf(
  order => order.awaitingResponseFrom !== "BUYER"
)

const goToStatusIfOrderIsNotSubmitted = goToStatusIf(
  order => order.state !== "SUBMITTED"
)

const goToReviewIfOrderIsPending: RedirectPredicate = ({ order }) => {
  if (order.state === "PENDING") {
    return `/orders/${order.id}/review`
  }
}

const goToRespondIfMyLastOfferIsNotMostRecentOffer: RedirectPredicate = ({
  order,
}) => {
  if (
    order.myLastOffer &&
    order.lastOffer &&
    moment(order.myLastOffer.createdAt).isAfter(order.lastOffer.createdAt)
  ) {
    return
  }
  return `/orders/${order.id}/respond`
}

const redirects: RedirectRecord = {
  path: "",
  rules: [goToArtworkIfOrderWasAbandoned],
  children: [
    {
      path: "respond",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "offer",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfOrderIsNotOfferOrder,
      ],
    },
    {
      path: "shipping",
      rules: [goToStatusIfOrderIsNotPending, goToOfferIfNoOfferMade],
    },
    {
      path: "payment",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
      ],
    },
    {
      path: "review",
      rules: [
        goToStatusIfOrderIsNotPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
      ],
    },
    {
      path: "review/counter",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
        goToRespondIfMyLastOfferIsNotMostRecentOffer,
      ],
    },
    {
      path: "review/accept",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "review/decline",
      rules: [
        goToStatusIfNotOfferOrder,
        goToStatusIfNotAwaitingBuyerResponse,
        goToStatusIfOrderIsNotSubmitted,
      ],
    },
    {
      path: "status",
      rules: [
        goToReviewIfOrderIsPending,
        goToShippingIfShippingIsNotCompleted,
        goToPaymentIfPaymentIsNotCompleted,
      ],
    },
  ],
}

export const shouldRedirect = ({
  location,
  order,
}: {
  location: Location
  order: routes_OrderQueryResponse["order"]
}) => {
  if (!order) {
    return false
  }

  function traverse(node: RedirectRecord, path: string): void {
    node.rules.forEach(rule => {
      const redirectPath = rule({ order })
      if (redirectPath) {
        throw new RedirectException(redirectPath)
      }
    })
    if (path.length > 0 && node.children) {
      // find most specific matching child (i.e. longest path match)
      const matchingChild = node.children
        .filter(child => path.startsWith(child.path))
        .sort((a, b) => a.path.split("/").length - b.path.split("/").length)
        .pop()
      if (matchingChild) {
        traverse(
          matchingChild,
          trimLeadingSlashes(path.slice(matchingChild.path.length))
        )
      }
    }
  }

  traverse(
    redirects,
    trimLeadingSlashes(location.pathname.replace(/order(2|s)\/[^\/]+/, ""))
  )

  return false
}

const trimLeadingSlashes = (s: string) => s.replace(/^\/+/, "")
