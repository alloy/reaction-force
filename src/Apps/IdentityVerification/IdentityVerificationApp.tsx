import { Box, Button, Sans, Serif } from "@artsy/palette"
import { IdentityVerificationApp_me } from "__generated__/IdentityVerificationApp_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { useTracking } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { ErrorPage } from "Components/ErrorPage"
import React from "react"
import { Meta, Title as HeadTitle } from "react-head"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface Props {
  me: IdentityVerificationApp_me
}

const IdentityVerificationApp: React.FC<Props> = ({ me }) => {
  const { identityVerification } = me

  if (!identityVerification || identityVerification.userID !== me.internalID) {
    return <ErrorPage code={404} />
  }

  const { trackEvent } = useTracking()

  const clickContinueToVerification = () => {
    trackEvent({
      context_page_owner_id: identityVerification.internalID,
      action_type: Schema.ActionType.ClickedContinueToIdVerification,
      context_page: Schema.PageName.IdentityVerificationPage,
    })
  }

  return (
    <AppContainer>
      <HeadTitle>Artsy | ID Verification</HeadTitle>

      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
      />

      <Box px={[2, 3]} mb={6} mt={4}>
        <Box
          mx={["auto"]}
          width={["100%", "80%"]}
          maxWidth={"400px"}
          textAlign="center"
        >
          <Serif size="6" color="black100">
            Artsy identity verification
          </Serif>

          <Box textAlign="left">
            <Sans size="4" color="black100" mt={2} weight="medium">
              You’ll need
            </Sans>
            <Sans size="4" color="black100">
              • A camera on your phone or computer
            </Sans>
            <Sans size="4" color="black100">
              • Your government ID{" "}
            </Sans>
            <Sans size="4" color="black100" mt={2} weight="medium">
              Keep in mind
            </Sans>
            <Sans size="4" color="black100">
              • Verification will take 5–10 minutes
            </Sans>
            <Sans size="4" color="black100">
              • The name on your ID must match the name on your payment method
            </Sans>
            <Sans size="4" color="black100">
              • Your ID and photo will only be used for verification purposes,
              and will not be shared
            </Sans>
            <br />
            <Sans size="4" color="black100">
              By clicking the button, you'll be redirected to our identity
              verification partner.
            </Sans>
          </Box>

          <Button
            block
            width={["100%", 335]}
            mt={4}
            onClick={() => {
              clickContinueToVerification()
            }}
          >
            Continue to verification
          </Button>
        </Box>
      </Box>
    </AppContainer>
  )
}

export const IdentityVerificationAppFragmentContainer = createFragmentContainer(
  IdentityVerificationApp,
  {
    me: graphql`
      fragment IdentityVerificationApp_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        internalID
        name
        identityVerification(id: $id) {
          internalID
          userID
        }
      }
    `,
  }
)
export default IdentityVerificationAppFragmentContainer
