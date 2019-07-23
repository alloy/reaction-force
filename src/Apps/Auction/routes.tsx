// import { getRedirect } from "Apps/Order/getRedirect"
// import { confirmRouteExit, redirects } from "Apps/Order/redirects"
import { RouteConfig } from "found"
import * as React from "react"
import { graphql } from "react-relay"
import { AuctionAppFragmentContainer } from "./AuctionApp"

// import { RegisterFragmentContainer as RegisterRoute } from "Apps/Auction/Routes/Register"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

// @ts-ignore
import { ErrorPage } from "Components/ErrorPage"

// FIXME:
// * `render` functions requires casting
export const routes: RouteConfig[] = [
  {
    path: "/auction-registration/:saleID",
    Component: AuctionAppFragmentContainer,
    render: ({ Component, props }) => {
      if (Component && props) {
        return <Component {...props} />
      }
    },
    query: graphql`
      query routes_AuctionQuery($saleID: String!) {
        me: me {
          ...AuctionApp_me
        }
        sale: sale(id: $saleID) {
          ...AuctionApp_sale
        }
      }
    `,
  },
]
