import React from "react"
import StaticContainer from "react-static-container"

import { Box } from "@artsy/palette"
import { ErrorPage } from "Components/ErrorPage"
import ElementsRenderer from "found/lib/ElementsRenderer"
import { data as sd } from "sharify"
import styled from "styled-components"
import createLogger from "Utils/logger"

const logger = createLogger("Artsy/Router/Utils/RenderStatus")

export const RenderPending: React.FC = props => {
  /**
   * TODO: Add timeout here for when a request takes too long. Show generic error
   * and notify Sentry.
   */
  return (
    <>
      <Renderer>{null}</Renderer>
      <LoadingOverlay />
    </>
  )
}

export const RenderReady: React.FC<{
  elements: React.ReactNode
}> = props => {
  return (
    <Renderer shouldUpdate>
      <ElementsRenderer elements={props.elements} />
    </Renderer>
  )
}

export const RenderError: React.FC<{
  error: { status?: number; data?: any }
}> = props => {
  logger.error(props.error.data)

  const message =
    (process.env.NODE_ENV || sd.NODE_ENV) === "development"
      ? String(props.error.data)
      : "Internal error"

  // TODO: Make error code more granular. See:
  // https://artsyproduct.atlassian.net/browse/PLATFORM-1343
  // https://github.com/artsy/reaction/pull/1855
  return <ErrorPage code={props.error.status} message={message} />
}

const LoadingOverlay = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.5);
  z-index: 10;
  height: 100vh;
`

/**
 * Define a container component so that we don't run into reconciliation issues
 * due to an element existing in RenderPending that doesn't exist in RenderReady,
 * between the top most container and StaticContainer.
 *
 */
const Renderer = ({ children, ...props }) => {
  return (
    <Box>
      <StaticContainer {...props}>{children}</StaticContainer>
    </Box>
  )
}
