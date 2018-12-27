import { color, Flex } from "@artsy/palette"
import { ArtworkActions_artwork } from "__generated__/ArtworkActions_artwork.graphql"
import { Bell } from "Assets/Icons/Bell"
import { Heart } from "Assets/Icons/Heart"
import SaveButton, { SaveProps, SaveState } from "Components/Artwork/Save"
import Icon from "Components/Icon"
import { isNull } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtworkSharePanelFragmentContainer as ArtworkSharePanel } from "./ArtworkSharePanel"

interface ArtworkActionsProps {
  artwork: ArtworkActions_artwork
}

interface ArtworkActionsState {
  showSharePanel: boolean
}

export class ArtworkActions extends React.Component<
  ArtworkActionsProps,
  ArtworkActionsState
> {
  state = {
    showSharePanel: false,
  }

  toggleSharePanel = () => {
    const showSharePanel = !this.state.showSharePanel
    this.setState({
      showSharePanel,
    })
  }

  render() {
    return (
      <Container>
        <SaveButton artwork={this.props.artwork} render={Save} />
        <ShareButton onClick={this.toggleSharePanel} />

        {this.state.showSharePanel && (
          <ArtworkSharePanel
            artwork={this.props.artwork}
            onClose={this.toggleSharePanel}
          />
        )}
      </Container>
    )
  }
}

export const ArtworkActionsFragmentContainer = createFragmentContainer(
  ArtworkActions,
  graphql`
    fragment ArtworkActions_artwork on Artwork {
      ...Save_artwork
      ...ArtworkSharePanel_artwork

      sale {
        is_closed
      }
    }
  `
)

const Container = styled(Flex).attrs({
  justifyContent: ["left", "center"],
  mb: [2, 0],
  ml: [-0.5, 1],
  pt: [0, 3],
})`
  position: relative;
  user-select: none;
  cursor: pointer;
`

const ShareButton = styled(Icon).attrs({
  name: "share",
  color: color("black100"),
})``

ShareButton.displayName = "ShareButton"

/**
 * Custom renderer for SaveButton
 */
const Save = (
  props: SaveProps & {
    artwork: { sale: { is_closed: boolean } }
  },
  state: SaveState
) => {
  const { isHovered } = state
  const isOpenSale = props.artwork.sale && !props.artwork.sale.is_closed
  const isSaved = isNull(state.is_saved)
    ? props.artwork.is_saved
    : state.is_saved
  const fill = isHovered ? color("purple100") : color("black100")
  return isOpenSale ? (
    <Bell fill={fill} selected={isSaved} style={{ cursor: "pointer" }} />
  ) : (
    <Heart fill={fill} selected={isSaved} style={{ cursor: "pointer" }} />
  )
}
