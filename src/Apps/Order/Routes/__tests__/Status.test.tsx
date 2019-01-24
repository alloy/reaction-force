import { Message } from "@artsy/palette"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderPickup,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { trackPageView } from "Apps/Order/Utils/trackPageView"
import { MockBoot, renderRelayTree } from "DevTools"
import { render } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { StatusFragmentContainer } from "../Status"

jest.mock("Apps/Order/Utils/trackPageView")
jest.unmock("react-relay")

describe("Status", () => {
  const getWrapper = (order: any, headTags: JSX.Element[] = []) => {
    return renderRelayTree({
      Component: StatusFragmentContainer,
      query: graphql`
        query StatusQuery {
          order(id: "42") {
            ...Status_order
          }
        }
      `,
      mockData: {
        order,
      },
      wrapper: renderer => (
        <MockBoot breakpoint="xs" headTags={headTags}>
          {renderer}
        </MockBoot>
      ),
    })
  }

  describe("offers", () => {
    it("should should have a title containing status", async () => {
      const headTags: JSX.Element[] = []
      await getWrapper(
        {
          ...OfferOrderWithShippingDetails,
          state: "SUBMITTED",
        },
        headTags
      )
      expect(headTags.length).toEqual(1)
      expect(render(headTags[0]).text()).toBe("Offer status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "SUBMITTED",
        })
        expect(wrapper.text()).toContain("Your offer has been submitted")
        expect(wrapper.find(Message).length).toBe(1)
      })

      it("should not warn the user about having the artwork bought while artwork is not available for buy now", async () => {
        const order = OfferOrderWithShippingDetails
        order.lineItems.edges[0].node.artwork.is_acquireable = false
        const wrapper = await getWrapper({
          ...order,
          state: "SUBMITTED",
        })
        expect(wrapper.text()).not.toContain("or buy now at list price")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("approved", () => {
      it("should say confirmed and have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "APPROVED",
        })
        expect(wrapper.text()).toContain("Offer accepted")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has shipped")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has been picked up")
        expect(wrapper.find(Message).length).toBe(0)
      })
    })

    describe("buyer rejected", () => {
      it("should say that offer was declined", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "buyer_rejected",
        })
        expect(wrapper.text()).toContain("Offer declined")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("seller rejected", () => {
      it("should say that offer was declined", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "seller_rejected",
        })
        expect(wrapper.text()).toContain("Offer declined")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("seller lapsed", () => {
      it("should say that offer expired", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "seller_lapsed",
        })
        expect(wrapper.text()).toContain("offer expired")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("buyer lapsed", () => {
      it("should say that offer expired", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: "buyer_lapsed",
        })
        expect(wrapper.text()).toContain("offer expired")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "REFUNDED",
        })
        expect(wrapper.text()).toContain("Your order was canceled and refunded")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("canceled after accpet", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...OfferOrderPickup,
          state: "CANCELED",
          stateReason: null,
        })
        expect(wrapper.text()).toContain("Your order was canceled and refunded")
        expect(wrapper.find(Message).length).toBe(1)
        expect(wrapper.find(TransactionDetailsSummaryItem).length).toBe(1)
      })
    })
  })

  describe("orders", () => {
    it("should should have a title containing status", async () => {
      const headTags: JSX.Element[] = []
      await getWrapper(BuyOrderWithShippingDetails, headTags)
      expect(headTags.length).toEqual(1)
      expect(render(headTags[0]).text()).toBe("Order status | Artsy")
    })

    describe("submitted", () => {
      it("should say order submitted and have message box", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "SUBMITTED",
        })
        expect(wrapper.text()).toContain("Your order has been submitted")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("approved", () => {
      it("should say confirmed", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "APPROVED",
        })
        expect(wrapper.text()).toContain("Your order is confirmed")
      })
    })

    describe("fulfilled (ship)", () => {
      it("should say order has shipped and have message box", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has shipped")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("fulfilled (pickup)", () => {
      it("should say order has been picked up and NOT have message box", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderPickup,
          state: "FULFILLED",
        })
        expect(wrapper.text()).toContain("Your order has been picked up")
        expect(wrapper.find(Message).length).toBe(0)
      })
    })

    describe("canceled (ship)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderWithShippingDetails,
          state: "CANCELED",
        })
        expect(wrapper.text()).toContain("Your order was canceled and refunded")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("canceled (pickup)", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderPickup,
          state: "CANCELED",
        })
        expect(wrapper.text()).toContain("Your order was canceled and refunded")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })

    describe("refunded", () => {
      it("should say that order was canceled", async () => {
        const wrapper = await getWrapper({
          ...BuyOrderPickup,
          state: "REFUNDED",
        })
        expect(wrapper.text()).toContain("Your order was canceled and refunded")
        expect(wrapper.find(Message).length).toBe(1)
      })
    })
  })

  it("tracks a pageview", async () => {
    await getWrapper({
      ...OfferOrderWithShippingDetails,
      state: "SUBMITTED",
    })

    expect(trackPageView).toHaveBeenCalledTimes(1)
  })
})
