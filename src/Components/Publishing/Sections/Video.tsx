import React from "react"
import sizeMe from "react-sizeme"
import styled, { StyledFunction } from "styled-components"
import urlParser from "url"
import { resize } from "../../../Utils/resizer"
import { pMedia as breakpoint } from "../../Helpers"
import { sizeMeRefreshRate } from "../Constants"
import { Layout } from "../Typings"
import { Caption } from "./Caption"

const QUERYSTRING = "?title=0&portrait=0&badge=0&byline=0&showinfo=0&rel=0&controls=2&modestbranding=1&iv_load_policy=3&color=E5E5E5"
const videoRatio = 0.5625

interface VideoProps {
  section: {
    url: string
    caption?: string
    cover_image_url?: string
  }
  size?: any
  layout?: Layout
}

interface VideoState {
  src?: string // FIXME: Coming from Positron, this can be empty / invalid
  hidden: boolean
}

class VideoComponent extends React.Component<VideoProps, VideoState> {
  static defaultProps = {
    size: {
      width: 500,
    },
  }

  constructor(props) {
    super(props)
    const { url } = this.props.section

    if (url) {
      const parsedUrl = urlParser.parse(url, true)
      const playerUrl = getPlayerUrl(parsedUrl)
      const id = getId(parsedUrl)
      const playerSrc = playerUrl + id + QUERYSTRING

      this.state = {
        src: playerSrc,
        hidden: false
      }
    } else {
      console.error(
        '(@artsy/reaction) Video.tsx: A url is required for video.', this.props
      )

      this.state = {
        hidden: true
      }
    }

  }

  playVideo = () => {
    const playerSrc = this.state.src + "&autoplay=1"
    this.setState({ src: playerSrc, hidden: true })
  }

  render() {
    const { caption, cover_image_url } = this.props.section
    const { width } = this.props.size
    const src = resize(cover_image_url, { width: 1200 })
    const showCaption = this.props.layout !== 'feature'

    return (
      <VideoContainer layout={this.props.layout} className='VideoContainer__StyledComponent'>
        {cover_image_url &&
          <CoverImage src={src} height={width * videoRatio} onClick={this.playVideo} hidden={this.state.hidden}>
            <PlayButton>
              <PlayButtonCaret />
            </PlayButton>
          </CoverImage>
        }

        <IFrame
          src={this.state.src}
          frameBorder="0"
          allowFullScreen
          height={width * videoRatio}
        />

        {showCaption &&
          <Caption caption={caption} layout={this.props.layout}>
            {this.props.children}
          </Caption>
        }

      </VideoContainer>
    )
  }
}

// Utils

function getPlayerUrl(url) {
  const { hostname } = url

  if (hostname) {
    if (hostname.indexOf("vimeo.com") > -1) {
      return "https://player.vimeo.com/video/"
    } else if (hostname.indexOf("youtu") > -1) {
      return "https://www.youtube.com/embed/"
    }
  } else {
    return '' // FIXME: check for errors
  }
}

function getId(url) {
  const { hostname, pathname } = url

  if (hostname && pathname) {
    if (url.hostname.indexOf("youtube.com") > 0) {
      return url.query.v
    } else {
      return url.pathname.split("/").pop()
    }
  } else {
    return '' // FIXME: error
  }
}

// Styles

const iframe: StyledFunction<React.HTMLProps<HTMLIFrameElement>> = styled.iframe

const IFrame = iframe`
  width: 100%;
  height: ${props => props.height + "px"};
`

interface CoverImageProps {
  src?: string
  height?: number
  layout?: Layout
}

const Div: StyledFunction<CoverImageProps & React.HTMLProps<HTMLDivElement>> = styled.div

const VideoContainer = Div`
  width: 100%;
  position: relative;

  ${({ layout }) => {
    if (layout === 'feature') {
      return `
        text-align: center;
        padding-bottom: 53px;
        max-width: 1200px;

        ${breakpoint.md`
          height: 450px;
        `}

        ${breakpoint.xs`
          height: 300px;
          padding-bottom: 20px;
        `}
      `
    }
  }}
`

const CoverImage = Div`
  display: ${props => (props.hidden || !props.src ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => props.height + "px"};
  position: absolute;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;
`

const PlayButtonCaret = styled.div`
  color: black;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 30px solid black;
`

const PlayButton = styled.div`
  background: white;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  cursor: pointer;
  border: 0;
  outline: 0;
`

const sizeMeOptions = {
  refreshRate: sizeMeRefreshRate,
  noPlaceholder: true,
}

export const Video = sizeMe(sizeMeOptions)(VideoComponent)
