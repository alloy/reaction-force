import styled from "styled-components"
import React from "react"
import { Arrow, ArrowContainer } from "./Components/Arrow"
import { ArtistTooltipContainer } from "./ArtistToolTip"
import { GeneToolTipContainer } from "./GeneToolTip"

interface Props extends React.HTMLProps<HTMLDivElement> {
  arrowLeft?: string
  entity: object
  orientation?: string
  model: string
  showMarketData?: boolean
  onMouseEnter?: any
  onMouseLeave?: any
  positionLeft?: number
}

export class ToolTip extends React.Component<Props> {
  getToolTip = () => {
    const { entity, model, showMarketData } = this.props

    switch (model) {
      case "artist": {
        return (
          <ArtistTooltipContainer
            showMarketData={showMarketData}
            artist={entity as any}
          />
        )
      }
      case "gene": {
        return <GeneToolTipContainer gene={entity as any} />
      }
      default: {
        return null
      }
    }
  }

  render() {
    const {
      arrowLeft,
      entity,
      orientation,
      onMouseEnter,
      onMouseLeave,
      positionLeft,
    } = this.props

    if (!entity) return null

    return (
      <ToolTipContainer
        orientation={orientation}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        positionLeft={positionLeft}
      >
        <Content orientation={orientation} arrowLeft={arrowLeft}>
          {orientation === "down" && (
            // point up from below content
            <Arrow orientation="up" />
          )}
          {this.getToolTip()}
          {orientation === "up" && (
            // point down from above content
            <Arrow orientation="down" />
          )}
        </Content>
      </ToolTipContainer>
    )
  }
}

interface DivProps {
  orientation: string
  onMouseEnter: any
  onMouseLeave: any
  positionLeft: number
}

export const ToolTipContainer = styled.div.attrs<DivProps>({})`
  position: absolute;
  z-index: 10;
  left: ${props => (props.positionLeft ? props.positionLeft : 0)}px;
  ${props =>
    props.orientation === "up" ? `bottom: 95%;` : `top: calc(100% + 10px);`};
`

const Content = styled.div.attrs<{ orientation: string; arrowLeft?: string }>(
  {}
)`
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;
  background: white;
  margin-bottom: 15px;
  width: fit-content;
  a {
    background-image: none;
  }
  ${ArrowContainer} {
    left: ${props =>
      props.arrowLeft ? `${props.arrowLeft}px` : `calc(50% - 15px)`};
    ${props =>
      props.orientation === "down" ? `top: -35px;` : `bottom: -15px;`};
  }
`
