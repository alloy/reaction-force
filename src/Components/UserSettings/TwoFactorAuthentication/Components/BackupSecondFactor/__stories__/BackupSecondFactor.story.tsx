import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { MockRelayRenderer } from "DevTools"
import { BackupSecondFactorFragmentContainer } from ".."
import {
  AppEnabledWithBackupCodesQueryResponse,
  CreateBackupSecondFactorsMutationSuccessResponse,
  DisabledQueryResponse,
} from "../../../__tests__/fixtures"

const MockBackupSecondFactor = ({ mockData }) => {
  return (
    <MockRelayRenderer
      Component={BackupSecondFactorFragmentContainer}
      mockData={mockData}
      mockMutationResults={CreateBackupSecondFactorsMutationSuccessResponse}
      query={graphql`
        query BackupSecondFactorStoryQuery {
          me {
            ...BackupSecondFactor_me
          }
        }
      `}
    />
  )
}

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/BackupSecondFactor",
  module
).add("Disabled", () => {
  return (
    <Theme>
      <Box maxWidth="800px">
        <MockBackupSecondFactor mockData={DisabledQueryResponse} />
      </Box>
    </Theme>
  )
})

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/BackupSecondFactor",
  module
).add("Enabled", () => {
  return (
    <Theme>
      <Box maxWidth="800px">
        <MockBackupSecondFactor
          mockData={AppEnabledWithBackupCodesQueryResponse}
        />
      </Box>
    </Theme>
  )
})
