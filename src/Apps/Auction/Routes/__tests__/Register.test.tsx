import React from "react"
import { graphql } from "react-relay"

import * as Schema from "Artsy/Analytics/Schema"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { ModalButton } from "Components/Modal/ModalDialog"
import { createTestEnv } from "DevTools/createTestEnv"
import { expectOne } from "DevTools/RootTestPage"

import { RegisterQueryResponseFixture } from "../../__fixtures__/routes_RegisterQuery"
import { createBidderSuccessful } from "../__fixtures__/MutationResults/createBidder"
import {
  createCreditCardFailed,
  createCreditCardSuccessful,
} from "../__fixtures__/MutationResults/createCreditCard"
import { stripeTokenResponse } from "../__fixtures__/Stripe"
import { RegisterRouteFragmentContainer } from "../Register"
import { RegisterTestPage } from "./Utils/RegisterTestPage"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("react-stripe-elements", () => {
  const stripeMock = {
    createToken: jest.fn(),
  }

  return {
    Elements: ({ children }) => children,
    StripeProvider: ({ children }) => children,
    CardElement: ({ onReady, hidePostalCode, ...props }) => <div {...props} />,
    __stripeMock: stripeMock,
    injectStripe: Component => props => (
      <Component stripe={stripeMock} {...props} />
    ),
  }
})

const setupCreateTokenMock = () => {
  const createTokenMock = require("react-stripe-elements").__stripeMock
    .createToken as jest.Mock

  createTokenMock.mockResolvedValue(stripeTokenResponse)
}
jest.mock("sharify", () => ({
  data: {
    APP_URL: "https://example.com",
  },
}))

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: RegisterTestPage,
    Component: RegisterRouteFragmentContainer,
    query: graphql`
      query RegisterValidTestQuery {
        sale(id: "example-auction-id") {
          ...Register_sale
        }

        me {
          ...Register_me
        }
      }
    `,
    defaultData: RegisterQueryResponseFixture,
    defaultMutationResults: {
      createCreditCard: {},
      createBidder: {},
    },
  })
}

describe("Routes/Register ", () => {
  beforeAll(() => {
    // @ts-ignore
    // tslint:disable-next-line:no-empty
    window.Stripe = () => {}
  })

  beforeEach(() => {
    window.location.assign = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("emits a RegistrationSubmitFailed analtyics event and halts submission", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    await page.submitForm()

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      context_page: Schema.PageName.AuctionRegistrationPage,
      auction_slug: RegisterQueryResponseFixture.sale.id,
      auction_state: RegisterQueryResponseFixture.sale.status,
      error_messages: [
        "Name is required",
        "Address is required",
        "Country is required",
        "City is required",
        "State is required",
        "Postal code is required",
        "Telephone is required",
        "You must agree to the Conditions of Sale",
      ],
      sale_id: RegisterQueryResponseFixture.sale._id,
      user_id: RegisterQueryResponseFixture.me.id,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(env.mutations.mockFetch).not.toBeCalled()
    expect(window.location.assign).not.toBeCalled()
  })

  it("successfully adds a credit card and registers the user as a bidder", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    setupCreateTokenMock()

    env.mutations.useResultsOnce(createCreditCardSuccessful)
    env.mutations.useResultsOnce(createBidderSuccessful)

    await page.fillFormWithValidValues()
    await page.submitForm()

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitted,
      context_page: Schema.PageName.AuctionRegistrationPage,
      auction_slug: RegisterQueryResponseFixture.sale.id,
      auction_state: RegisterQueryResponseFixture.sale.status,
      bidder_id: createBidderSuccessful.createBidder.bidder.id,
      sale_id: RegisterQueryResponseFixture.sale._id,
      user_id: RegisterQueryResponseFixture.me.id,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(window.location.assign).toHaveBeenCalledWith(
      `https://example.com/auction/${
        RegisterQueryResponseFixture.sale.id
      }/confirm-registration`
    )
  })

  it("displays an error modal if the `createCreditCard` mutation fails", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    setupCreateTokenMock()

    env.mutations.useResultsOnce(createCreditCardFailed)

    await page.fillFormWithValidValues()
    await page.submitForm()

    let errorModal = expectOne(page.find(ErrorModal))
    expect(errorModal.props().show).toBe(true)

    expectOne(errorModal.find(ModalButton)).simulate("click")

    errorModal = expectOne(page.find(ErrorModal))
    expect(errorModal.props().show).toBe(false)

    expect(mockPostEvent).toBeCalledWith({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      context_page: Schema.PageName.AuctionRegistrationPage,
      auction_slug: RegisterQueryResponseFixture.sale.id,
      auction_state: RegisterQueryResponseFixture.sale.status,
      error_messages: ["The `createCreditCard` mutation failed."],
      sale_id: RegisterQueryResponseFixture.sale._id,
      user_id: RegisterQueryResponseFixture.me.id,
    })
    expect(mockPostEvent).toHaveBeenCalledTimes(1)

    expect(window.location.assign).not.toBeCalled()
  })

  it("displays an error modal if the `createBidder` mutation fails", async () => {
    pending("until we can mimic Gravity-provided `createBidder` errors")
  })
})
