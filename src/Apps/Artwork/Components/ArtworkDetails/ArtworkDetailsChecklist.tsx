import { Box, Sans, StackableBorderBox } from "@artsy/palette"
import { Checkmark } from "Assets/Checkmark"
import colors from "Assets/Colors"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkDetailsChecklist_artwork } from "__generated__/ArtworkDetailsChecklist_artwork.graphql"

export interface ArtworkDetailsChecklistProps {
  artwork: ArtworkDetailsChecklist_artwork
}

export class ArtworkDetailsChecklist extends React.Component<
  ArtworkDetailsChecklistProps
> {
  renderRow(label: string, details: string) {
    if (!label && !details) {
      return null
    }
    return (
      <Box>
        <Box display="inline" mr={1}>
          <Checkmark stroke={colors.black} />
        </Box>
        <Sans size="2" weight="medium" display="inline" mr={1}>
          {label}
        </Sans>
        <Sans size="2" display="inline" color="black60">
          {details}
        </Sans>
      </Box>
    )
  }

  render() {
    const {
      certificateOfAuthenticity,
      conditionDescription,
      framed,
      signatureInfo,
    } = this.props.artwork
    if (
      !certificateOfAuthenticity &&
      !conditionDescription &&
      !framed &&
      !signatureInfo
    ) {
      return null
    }
    return (
      <StackableBorderBox pb={3}>
        <Box>
          {framed && this.renderRow(framed.label, framed.details)}
          {signatureInfo &&
            this.renderRow(signatureInfo.label, signatureInfo.details)}
          {conditionDescription &&
            this.renderRow(
              conditionDescription.label,
              conditionDescription.details
            )}
          {certificateOfAuthenticity &&
            this.renderRow(
              certificateOfAuthenticity.label,
              certificateOfAuthenticity.details
            )}
        </Box>
      </StackableBorderBox>
    )
  }
}

export const ArtworkDetailsChecklistFragmentContainer = createFragmentContainer(
  ArtworkDetailsChecklist,
  graphql`
    fragment ArtworkDetailsChecklist_artwork on Artwork {
      framed {
        label
        details
      }
      signatureInfo {
        label
        details
      }
      conditionDescription {
        label
        details
      }
      certificateOfAuthenticity {
        label
        details
      }
    }
  `
)
