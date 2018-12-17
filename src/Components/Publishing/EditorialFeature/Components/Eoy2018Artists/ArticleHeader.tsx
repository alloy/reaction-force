import { Box, color, Flex } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { media } from "Components/Helpers"
import { flatten, map } from "lodash"
import React from "react"
import styled from "styled-components"
import { textAlign } from "styled-system"
import { resize } from "Utils/resizer"
import { Media } from "Utils/Responsive"

export class Eoy2018ArticleHeader extends React.Component<{
  images?: any
  isMobile?: boolean
  isTablet?: boolean
}> {
  getImageUrls = gridSize => {
    const bgImages = map(flatten(this.props.images), "url")
    const resizedImages = bgImages.map(url => resize(url, { width: 300 }))
    const urls = []

    let i = 0
    for (i; i < gridSize; i++) {
      const bgIndex = Math.floor(
        Math.random() * Math.floor(resizedImages.length)
      )
      urls.push(resizedImages[bgIndex])
      // TODO: make unique
    }
    return urls
  }

  imagesGrid = gridSize => {
    const { isMobile, isTablet } = this.props
    const imageUrls = this.getImageUrls(gridSize)

    return imageUrls.map((src, i) => {
      const isMobileItem = isMobile && (i === 5 || i === 6)
      const isTabletItem = isTablet && [2, 3, 9].includes(i)
      const isVisible = isMobileItem || isTabletItem

      return (
        <GridItem key={i} width={[1 / 2, 1 / 3, 1 / 4]} isVisible={isVisible}>
          <Img src={src} />
        </GridItem>
      )
    })
  }

  render() {
    return (
      <ArticleHeader>
        <Media at="xs">
          <HeaderGrid flexWrap="wrap">{this.imagesGrid(8)}</HeaderGrid>
        </Media>
        <Media greaterThan="xs">
          <HeaderGrid flexWrap="wrap">{this.imagesGrid(12)}</HeaderGrid>
        </Media>

        <Title>
          <TitleBlock>The Most </TitleBlock>
          <TitleBlock textAlign="right">Influential </TitleBlock>
          <Media lessThan="md">
            <TitleBlock>Artists</TitleBlock>
          </Media>
          <Media lessThan="md">
            <TitleBlock textAlign="right"> of 2018</TitleBlock>
          </Media>

          <Media greaterThan="sm">
            <TitleBlock>Artists of 2018</TitleBlock>
          </Media>
        </Title>
      </ArticleHeader>
    )
  }
}

const HeaderGrid = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Img = styled.div<{ src?: string }>`
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s;

  ${({ src }) =>
    src &&
    `
    background: url(${src});
    background-size: cover;
    background-position: 50%;
    mix-blend-mode: screen;
    filter: grayscale(100%);
  `};
`

const GridItem = styled(Box)<{ isVisible?: boolean }>`
  border: 3px solid ${color("purple100")};
  transition: background-color 0.5s;
  ${Img} {
    ${props =>
      props.isVisible &&
      `
    opacity: 1;
    `};
  }

  &:hover {
    background-color: ${color("purple100")};
    ${Img} {
      opacity: 1;
    }
  }

  ${props =>
    props.isVisible &&
    `
    background-color: ${color("purple100")};
  `};
`

const ArticleHeader = styled.div`
  height: 90vh;
  max-height: 1000px;
  border: 3px solid ${color("purple100")};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const Title = styled.h1`
  min-height: 100%;
  min-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${unica("s100")};
`

// TODO: min-max font size responsive to vp
// font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])))
const TitleBlock = styled.span<{ textAlign?: string }>`
  display: block;
  font-size: 20vh;
  line-height: initial;
  ${textAlign};

  ${media.xs`
    font-size: 15vw;
  `};
`
