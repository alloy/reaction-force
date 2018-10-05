import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import AnalyticsProvider from "./AnalyticsProvider"
import { CollectAppFragmentContainer as CollectApp } from "./CollectApp"

export const routes: RouteConfig[] = [
  {
    path: "/collect/:medium?",
    Component: CollectApp,
    query: graphql`
      query routes_CollectAppQuery(
        $medium: String
        $major_periods: [String]
        $partner_id: ID
        $for_sale: Boolean
        $sort: String
        $at_auction: Boolean
        $ecommerce: Boolean
        $inquireable_only: Boolean
        $price_range: String
      ) {
        viewer {
          ...CollectApp_viewer
            @arguments(
              medium: $medium
              major_periods: $major_periods
              partner_id: $partner_id
              for_sale: $for_sale
              sort: $sort
              at_auction: $at_auction
              ecommerce: $ecommerce
              inquireable_only: $inquireable_only
              price_range: $price_range
            )
        }
      }
    `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      return <AnalyticsProvider {...props} Component={Component} />
    },
    prepareVariables: (params, props) => {
      const initialFilterState = props.location ? props.location.query : {}
      if (params.medium) {
        initialFilterState.medium = params.medium
        if (props.location.query) {
          props.location.query.medium = params.medium
        }
      }
      return { ...initialFilterState, ...params }
    },
  },
  {
    // TODO: wont work yet until collection graphql server is ready
    path: "/collection/:collection_id",
    Component: CollectApp,
    // query: graphql`
    //   query routes_CollectionAppQuery($collectionId: String!) {
    //     collection(id: $collectionId) {
    //       id
    //       title
    //       description
    //       query {
    //         medium
    //         major_periods
    //         gene_ids
    //         artist_ids
    //       }
    //     }
    //     viewer {
    //       ...CollectApp_viewer
    //     }
    //   }
    // `,
    render: ({ props, Component }) => {
      if (!props) {
        return null
      }

      // TODO: fill in data
      const collection = {}

      return <Component {...props} collection={collection} />
    },
  },
]
