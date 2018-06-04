import React from "react"
import styled from "styled-components"

export interface ModalProps extends React.HTMLProps<Modal> {
  show?: boolean
  onClose?: () => void
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: #fff;
  width: 500px;
  border-radius: 4px;
`

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.3);
`

export class Modal extends React.Component<ModalProps, any> {
  static defaultProps = {
    show: false,
  }

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close(e) {
    e.preventDefault()
    this.props.onClose()
  }

  render(): JSX.Element {
    const newProps: any = { ...this.props }
    delete newProps.onClose
    delete newProps.show

    if (!this.props.show) {
      return null
    }
    return (
      <div>
        <ModalContainer {...newProps}>{this.props.children}</ModalContainer>
        <Overlay onClick={this.close} />
      </div>
    )
  }
}

export default Modal
