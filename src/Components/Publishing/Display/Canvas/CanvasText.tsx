import { compact, map } from "lodash"
import React from "react"
import styled, { StyledFunction } from "styled-components"
import { pMedia } from "../../../Helpers"
import { Fonts } from "../../Fonts"

interface CanvasTextProps {
  disclaimer?: any
  unit: any
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  layout?: any
  isSlideshowWithCaption?: boolean
}

export const CanvasText: React.SFC<CanvasTextProps> = props => {
  const { disclaimer, unit } = props
  const isSlideshowWithCaption =
    unit.layout === "slideshow" && compact(map(unit.assets, "caption")).length
  const hasDisclaimer = unit.layout !== "overflow" && !isSlideshowWithCaption
  return (
    <CanvasInner layout={unit.layout} isSlideshowWithCaption>
      <div>
        <Logo layout={unit.layout} src={unit.logo} />
        <Headline layout={unit.layout}>{unit.headline}</Headline>
        <Link layout={unit.layout}>{unit.link.text}</Link>
      </div>
      {hasDisclaimer && disclaimer}
    </CanvasInner>
  )
}

const Div: StyledFunction<DivProps> = styled.div
const Img: StyledFunction<DivProps> = styled.img

const Logo = Img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: left;
  max-width: ${props => (props.layout === "overlay" ? "300px;" : "250px;")}
  max-height: ${props => (props.layout === "overlay" ? "100px;" : "90px;")}
  margin: ${props =>
    props.layout === "overlay" ? "60px auto;" : "20px 0 50px 0;"}
  ${props => pMedia.md`
    width: auto;
    margin: 20px 0;
    ${props.layout === "overlay" &&
      `max-width: calc(100% - 60px);
       margin: 15px auto;
    `}
  `}
`
const CanvasInner = Div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.layout === "overlay" || props.isSlideshowWithCaption
      ? "space-around;"
      : "space-between;"}
  ${props =>
    props.layout === "overlay" &&
    `text-align: center;
        color: #fff;
        max-width: 500px;`}
  ${props => pMedia.md`
    ${props.layout === "slideshow" && "width: 100%;"}
  `}
  ${pMedia.sm`
    max-width: 100%;
    width: 100%;
    padding: 0;
  `}
`
const Headline = Div`
  ${props =>
    props.layout === "overlay" ? Fonts.garamond("s23") : Fonts.garamond("s40")}
  line-height: ${props => (props.layout === "overlay" ? "1.35em;" : "1.1em;")} 
  margin-bottom: 25px;
  ${props => pMedia.lg`
    ${props.layout !== "overlay" && Fonts.garamond("s23")}
  `}
  ${props => pMedia.sm`
    margin: 0 auto 10px auto;
    max-width: calc(100% - 40px);
    ${props.layout !== "overlay" && "margin-left: 0;"}
  `}
  ${props => pMedia.xs`
    ${props.layout === "overlay" && Fonts.garamond("s17")}
    line-height: 1.35em;
  `}
`
const Link = Div`
  ${Fonts.garamond("s23")}
  line-height: 1.35em;
  margin-bottom: 10px;
  display: initial;
  background-image: linear-gradient(to bottom, transparent 0, ${props =>
    props.layout === "overlay" ? "#FFF" : "#000"} 2px, transparent 0);
  background-position: bottom;
  background-size: 1px 5px;
  background-repeat: repeat-x;
  transition: all .3s;
  &:hover {
    opacity: .6;
  }
  ${props => pMedia.lg`
    ${props.layout !== "overlay" && Fonts.garamond("s17")}
  `}
  ${pMedia.md`
    ${Fonts.garamond("s17")}
    line-height: 1.35em;
  `}
`
