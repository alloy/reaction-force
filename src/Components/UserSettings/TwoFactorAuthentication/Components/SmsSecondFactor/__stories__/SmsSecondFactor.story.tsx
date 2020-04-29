import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import {
  CreateSmsSecondFactorMutationSuccessResponse,
  DeliverSmsSecondFactorMutationErrorResponse,
  DeliverSmsSecondFactorMutationSuccessResponse,
  DisabledQueryResponse,
  EnableSmsSecondFactorMutationErrorResponse,
  EnableSmsSecondFactorMutationSuccessResponse,
  UpdateSmsSecondFactorMutationErrorResponse,
  UpdateSmsSecondFactorMutationSuccessResponse,
} from "Components/UserSettings/TwoFactorAuthentication/__tests__/fixtures"
import { MockRelayRenderer } from "DevTools"
import { merge } from "lodash"
import { SmsSecondFactorFragmentContainer } from ".."

const MockSmsSecondFactor = ({ mockData, mockMutationResults, query }) => {
  return (
    <MockRelayRenderer
      mockMutationResults={mockMutationResults}
      Component={SmsSecondFactorFragmentContainer}
      mockData={mockData}
      query={query}
    />
  )
}

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/SmsSecondFactor",
  module
).add("Update Error", () => {
  const mockMutationResults = merge(
    CreateSmsSecondFactorMutationSuccessResponse,
    UpdateSmsSecondFactorMutationErrorResponse
  )

  return (
    <Theme>
      <Box maxWidth="800px">
        <MockSmsSecondFactor
          mockData={DisabledQueryResponse}
          mockMutationResults={mockMutationResults}
          query={graphql`
            query SmsSecondFactorStoryUpdateErrorQuery {
              me {
                ...SmsSecondFactor_me
              }
            }
          `}
        />
      </Box>
    </Theme>
  )
})

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/SmsSecondFactor",
  module
).add("Undeliverable", () => {
  const mockMutationResults = merge(
    CreateSmsSecondFactorMutationSuccessResponse,
    UpdateSmsSecondFactorMutationSuccessResponse,
    DeliverSmsSecondFactorMutationErrorResponse
  )

  return (
    <Theme>
      <Box maxWidth="800px">
        <MockSmsSecondFactor
          mockData={DisabledQueryResponse}
          mockMutationResults={mockMutationResults}
          query={graphql`
            query SmsSecondFactorStoryUndeliverableQuery {
              me {
                ...SmsSecondFactor_me
              }
            }
          `}
        />
      </Box>
    </Theme>
  )
})

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/SmsSecondFactor",
  module
).add("Success", () => {
  const mockMutationResults = merge(
    CreateSmsSecondFactorMutationSuccessResponse,
    DeliverSmsSecondFactorMutationSuccessResponse,
    UpdateSmsSecondFactorMutationSuccessResponse,
    EnableSmsSecondFactorMutationSuccessResponse
  )

  return (
    <Theme>
      <Box maxWidth="800px">
        <MockSmsSecondFactor
          mockData={DisabledQueryResponse}
          mockMutationResults={mockMutationResults}
          query={graphql`
            query SmsSecondFactorStorySuccessQuery {
              me {
                ...SmsSecondFactor_me
              }
            }
          `}
        />
      </Box>
    </Theme>
  )
})

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/SmsSecondFactor",
  module
).add("Incorrect OTP code", () => {
  const mockMutationResults = merge(
    CreateSmsSecondFactorMutationSuccessResponse,
    DeliverSmsSecondFactorMutationSuccessResponse,
    UpdateSmsSecondFactorMutationSuccessResponse,
    EnableSmsSecondFactorMutationErrorResponse
  )

  return (
    <Theme>
      <Box maxWidth="800px">
        <MockSmsSecondFactor
          mockData={DisabledQueryResponse}
          mockMutationResults={mockMutationResults}
          query={graphql`
            query SmsSecondFactorStoryErrorQuery {
              me {
                ...SmsSecondFactor_me
              }
            }
          `}
        />
      </Box>
    </Theme>
  )
})
