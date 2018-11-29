import { Box, color, Flex, space } from "@artsy/palette"
import FadeTransition from "Components/Animation/FadeTransition"
import { bind, once, throttle } from "lodash"
import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { CloseButton } from "./CloseButton"
import { Slider, SliderProps } from "./LightboxSlider"

const KEYBOARD_EVENT = "keyup"
const ZOOM_PER_CLICK = 1.4
const HIDE_ZOOM_SLIDER_AFTER = 2500

const DeepZoomContainer = styled.div`
  position: fixed !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: ${color("black100")};
`

export interface LightboxProps {
  deepZoom: {
    Image: {
      xmlns: string
      Url: string
      Format: string
      Overlap: number
      TileSize: number
      Size: {
        Width: number
        Height: number
      }
    }
  }

  enabled?: boolean

  /**
   * Id of the element to render the lightbox in
   * Defaults to lightbox-container
   */
  lightboxId?: string
}

export interface LightboxState {
  shown: boolean
  element: Element
  viewer: any
  deepZoomRef: any
  slider: SliderProps
  showZoomSlider: boolean
  promisedDragon: Promise<any>
  activityTimer?: NodeJS.Timer
}

export class Lightbox extends React.Component<LightboxProps, LightboxState> {
  static defaultProps = {
    enabled: true,
    lightboxId: "lightbox-container",
  }

  state = {
    element: null,
    viewer: null,
    shown: false,
    activityTimer: null,
    showZoomSlider: true,
    deepZoomRef: React.createRef(),
    slider: {
      min: 0,
      max: 1,
      step: 0.001,
      value: 0,
    },
    promisedDragon: null,
  }

  show = event => {
    this.setState({ shown: true, showZoomSlider: true })
  }

  hide = () => {
    this.setState({ shown: false })
    if (this.state.viewer) {
      this.state.viewer.destroy()
      this.state.viewer = null
    }
    document.removeEventListener(KEYBOARD_EVENT, this.handleKeyPress)
    clearTimeout(this.state.activityTimer)
  }

  handleKeyPress = event => {
    if (event && event.key === "Escape") {
      this.hide()
    }
  }

  detectActivity = throttle(() => {
    clearTimeout(this.state.activityTimer)
    this.setState({
      showZoomSlider: true,
      activityTimer: setTimeout(() => {
        this.setState({
          showZoomSlider: false,
        })
      }, HIDE_ZOOM_SLIDER_AFTER),
    })
  }, 500) as () => void

  zoomBy = amount => {
    if (this.state.viewer.viewport) {
      this.state.viewer.viewport.zoomBy(amount)
      this.state.viewer.viewport.applyConstraints()
    }
  }

  zoomIn = () => {
    this.zoomBy(ZOOM_PER_CLICK)
  }

  zoomOut = () => {
    this.zoomBy(1 / ZOOM_PER_CLICK)
  }

  initSeaDragon = () => {
    this.state.promisedDragon.then(OpenSeaDragon => {
      const viewer = OpenSeaDragon({
        element: this.state.deepZoomRef.current,

        debugMode: false,
        showNavigationControl: false,
        immediateRender: false,
        useCanvas: true,
        constrainDuringPan: false,
        blendTime: 0.0,
        animationTime: 1.5,
        springStiffness: 15.0,
        maxZoomPixelRatio: 1.0,
        minZoomImageRatio: 0.9,
        zoomPerClick: ZOOM_PER_CLICK,
        zoomPerScroll: 1.4,
        clickDistThreshold: 5,
        clickTimeThreshold: 300,
        visibilityRatio: 1,
        tileSources: this.props.deepZoom,

        gestureSettingsTouch: {
          scrolltozoom: false,
          clicktozoom: true,
          pinchtozoom: true,
          flickenabled: true,
          flickminspeed: 20,
          flickmomentum: 0.4,
        },
      })
      document.addEventListener(KEYBOARD_EVENT, this.handleKeyPress)
      this.setState({
        viewer,
      })
    })
  }

  onSliderChanged = event => {
    this.state.viewer.viewport.zoomTo(event.target.value)
  }

  onZoomChanged = () => {
    if (!this.state.viewer) return
    this.setState({
      slider: {
        ...this.state.slider,
        min: this.state.viewer.viewport.getMinZoom(),
        max: this.state.viewer.viewport.getMaxZoom(),
        value: this.state.viewer.viewport.getZoom(),
      },
    })
  }

  componentDidMount() {
    this.setState({
      element: document.getElementById(this.props.lightboxId),
      // FIXME: convert to import('openseadragon) once force supports it
      promisedDragon: Promise.resolve(require("openseadragon")),
    })
  }

  componentWillUnmount() {
    this.hide()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shown === true && prevState.shown === false) {
      this.initSeaDragon()
    }
    if (this.state.viewer && !prevState.viewer) {
      this.postRender()
    }
  }

  renderLightbox() {
    const { slider } = this.state
    return (
      <FadeTransition
        in={this.state.shown}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 250, exit: 300 }}
      >
        <DeepZoomContainer
          onMouseMove={this.detectActivity}
          onWheel={this.detectActivity}
          onTouchStart={this.detectActivity}
          onTouchMove={this.detectActivity}
          innerRef={this.state.deepZoomRef as any /* TODO Update SC */}
        >
          <Box
            position="absolute"
            top={space(3) / 2}
            right={space(3) / 2}
            zIndex={1001}
          >
            <CloseButton onClick={() => this.hide()} />
          </Box>
          <Flex
            position="absolute"
            width="100%"
            justifyContent="center"
            zIndex={1001}
            bottom={space(2)}
          >
            <FadeTransition
              in={this.state.showZoomSlider}
              timeout={{ enter: 50, exit: 150 }}
            >
              <Slider
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={this.onSliderChanged}
                onZoomInClicked={() => this.zoomIn()}
                onZoomOutClicked={() => this.zoomOut()}
              />
            </FadeTransition>
          </Flex>
        </DeepZoomContainer>
      </FadeTransition>
    )
  }

  renderPortal = () => {
    return this.state.element
      ? ReactDOM.createPortal(this.renderLightbox(), this.state.element)
      : null
  }

  render() {
    const { children, enabled } = this.props

    // Only render client-side
    if (!this.state.element) {
      return children
    }

    const modifiedChildren = React.Children.map(
      children,
      (child: React.ReactElement<any>) => {
        return React.cloneElement(child, {
          ...(enabled && {
            style: { cursor: "zoom-in" },
            onClick: this.show,
          }),
        })
      }
    )
    return (
      <React.Fragment>
        {this.renderPortal()}
        {modifiedChildren}
      </React.Fragment>
    )
  }

  postRender = () => {
    this.state.viewer.addHandler(
      "zoom",
      bind(throttle(this.onZoomChanged, 50), this)
    )
    this.state.viewer.addHandler(
      "tile-drawn",
      once(() => {
        this.setState({
          slider: {
            ...this.state.slider,
            min: this.state.viewer.viewport.getMinZoom(),
            max: this.state.viewer.viewport.getMaxZoom(),
            value: this.state.viewer.viewport.getHomeZoom(),
          },
        })
      })
    )
    this.detectActivity()
  }
}
