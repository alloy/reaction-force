import { Flex, Join, Message, Sans, Serif, Spacer } from "@artsy/palette"
import { Status_order } from "__generated__/Status_order.graphql"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import React, { Component } from "react"
import { Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { Responsive } from "Utils/Responsive"
import { Helper } from "../../Components/Helper"
import { ShippingAndPaymentSummaryFragmentContainer as ShippingAndPaymentSummary } from "../../Components/ShippingAndPaymentSummary"
import { TransactionSummaryFragmentContainer as TransactionSummary } from "../../Components/TransactionSummary"

export interface StatusProps {
  order: Status_order
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export class StatusRoute extends Component<StatusProps> {
  render() {
    const { order } = this.props

    return (
      <Responsive>
        {({ xs }) => (
          <TwoColumnLayout
            Content={
              <>
                <Title>Order status | Artsy</Title>
                <Join separator={<Spacer mb={xs ? 2 : 3} />}>
                  <>
                    <Serif size="6" weight="regular" color="black100">
                      Your order has been submitted
                    </Serif>
                    <Sans size="2" weight="regular" color="black60">
                      Order #{order.code}
                    </Sans>
                    <Message mt={xs ? 2 : 3}>
                      Thank you for your order. You’ll receive a confirmation
                      email shortly. If you have questions, please contact{" "}
                      <a href="#">orders@artsy.net</a>.
                    </Message>
                  </>
                  <TransactionSummary order={order} />
                </Join>
                <Spacer mb={xs ? 2 : 3} />
              </>
            }
            Sidebar={
              <Flex flexDirection="column">
                <ShippingAndPaymentSummary order={order} mb={xs ? 2 : 3} />
                <Helper artworkId={order.lineItems.edges[0].node.artwork.id} />
              </Flex>
            }
          />
        )}
      </Responsive>
    )
  }
}

export const StatusFragmentContainer = createFragmentContainer(
  StatusRoute,
  graphql`
    fragment Status_order on Order {
      id
      code
      ...TransactionSummary_order
      ...ShippingAndPaymentSummary_order
      lineItems {
        edges {
          node {
            artwork {
              id
              ...ItemReview_artwork
            }
          }
        }
      }
    }
  `
)
