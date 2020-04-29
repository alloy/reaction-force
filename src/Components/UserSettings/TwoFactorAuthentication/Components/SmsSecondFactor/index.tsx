import { BorderBox, Button, Flex, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React, { useState } from "react"
import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"

import { useSystemContext } from "Artsy"

import { ApiError } from "../../ApiError"
import { DisableSecondFactor } from "../Mutation/DisableSecondFactor"
import { SmsSecondFactorModal } from "./Modal"
import { CreateSmsSecondFactor } from "./Mutation/CreateSmsSecondFactor"

import { SmsSecondFactor_me } from "__generated__/SmsSecondFactor_me.graphql"
import { ApiErrorModal } from "../ApiErrorModal"

interface SmsSecondFactorProps extends BorderBoxProps {
  me: SmsSecondFactor_me
  relayRefetch?: RelayRefetchProp
}

export const SmsSecondFactor: React.FC<SmsSecondFactorProps> = props => {
  const { me, relayRefetch } = props
  const { relayEnvironment } = useSystemContext()
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [apiErrors, setApiErrors] = useState<ApiError[]>([])

  const [stagedSecondFactor, setStagedSecondFactor] = useState(null)

  function onComplete() {
    setShowSetupModal(false)
    relayRefetch.refetch({})
  }

  function handleMutationError(errors: ApiError[]) {
    if (!Array.isArray(errors)) {
      throw errors
    }

    setApiErrors(errors)
  }

  async function createSecondFactor() {
    try {
      const response = await CreateSmsSecondFactor(relayEnvironment, {
        attributes: {},
      })
      const factor = response.createSmsSecondFactor.secondFactorOrErrors

      setStagedSecondFactor(factor)
      setShowSetupModal(true)
    } catch (error) {
      handleMutationError(error)
    }
  }

  async function disableSecondFactor() {
    if (me.smsSecondFactors[0].__typename !== "SmsSecondFactor") {
      return
    }

    try {
      await DisableSecondFactor(relayEnvironment, {
        secondFactorID: me.smsSecondFactors[0].internalID,
      })

      relayRefetch.refetch({})
    } catch (error) {
      handleMutationError(error)
    }
  }

  return (
    <BorderBox p={2} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            Use text messages
          </Sans>
          <Serif size="3t" color="black60">
            Security codes will be sent to your mobile phone.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.smsSecondFactors.length &&
          me.smsSecondFactors[0].__typename === "SmsSecondFactor" ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.smsSecondFactors[0].formattedPhoneNumber}
              </Sans>
              <Button
                onClick={disableSecondFactor}
                ml={1}
                variant="secondaryOutline"
              >
                Disable
              </Button>
              <Button
                onClick={createSecondFactor}
                ml={1}
                variant="secondaryGray"
              >
                Edit
              </Button>
            </>
          ) : (
            <Button onClick={createSecondFactor}>Set up</Button>
          )}
        </Flex>
      </Flex>
      <SmsSecondFactorModal
        show={showSetupModal}
        secondFactor={stagedSecondFactor}
        onComplete={onComplete}
        onClose={() => setShowSetupModal(false)}
      />
      <ApiErrorModal
        onClose={() => setApiErrors([])}
        show={!!apiErrors.length}
        errors={apiErrors}
      />
    </BorderBox>
  )
}

export const SmsSecondFactorFragmentContainer = createFragmentContainer(
  SmsSecondFactor,
  {
    me: graphql`
      fragment SmsSecondFactor_me on Me {
        smsSecondFactors: secondFactors(kinds: [sms]) {
          ... on SmsSecondFactor {
            __typename
            internalID
            formattedPhoneNumber
          }
        }
      }
    `,
  }
)
