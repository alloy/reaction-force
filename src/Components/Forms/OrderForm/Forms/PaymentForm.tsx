import { Field } from "../../support"
import InvertedButton from "../../../Buttons/Inverted"
import React, { Component } from "react"
import Title from "../../../Title"
import { AddressFormInputs } from "./ShippingForm"
import { Checkbox } from "../../../Checkbox"
import { Row, Col } from "react-styled-flexboxgrid"
import { StyledGrid as Grid, Contact } from "./common"
import { WizardStepChildProps } from "../../../Wizard/types"

interface State {
  showPaymentAddress: boolean
}

export class PaymentForm extends Component<WizardStepChildProps, State> {
  state = {
    showPaymentAddress: false,
  }

  toggleShowPaymentAddress = () => {
    const showPaymentAddress = !this.state.showPaymentAddress

    this.setState({
      showPaymentAddress,
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs>
            <Title titleSize="medium">Payment method</Title>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Field name="nameOnCard" placeholder="Name on card" block />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Field name="cardNumber" placeholder="Card number" block />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Field name="expiration" placeholder="Expiration" block />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Field name="securityCode" placeholder="Security code" block />
          </Col>
        </Row>

        {/* Spacer */}
        <Row>
          <Col>&nbsp;</Col>
        </Row>

        <Row>
          <Col xs>
            <Title titleSize="medium">Billing address</Title>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Checkbox checked onClick={() => this.toggleShowPaymentAddress()}>
              Same as shipping
            </Checkbox>
          </Col>
        </Row>

        {/* Spacer */}
        <Row>
          <Col>&nbsp;</Col>
        </Row>

        <AddressFormInputs billing />

        {/* Spacer */}
        <Row>
          <Col>&nbsp;</Col>
        </Row>

        <Row>
          <Col xs>
            <InvertedButton block onClick={this.props.form.handleSubmit}>
              REVIEW ORDER
            </InvertedButton>
          </Col>
        </Row>
        <Row>
          <Col xs>
            <Contact />
          </Col>
        </Row>
      </Grid>
    )
  }
}
