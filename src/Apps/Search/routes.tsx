import { SearchResultsArticlesRouteRouteFragmentContainer as SearchResultsArticlesRoute } from "Apps/Search/Routes/Articles/SearchResultsArticles"
import { SearchResultsArtistsRouteFragmentContainer as SearchResultsArtistsRoute } from "Apps/Search/Routes/Artists/SearchResultsArtists"
import { SearchResultsArtworksRouteFragmentContainer as SearchResultsArtworksRoute } from "Apps/Search/Routes/Artworks/SearchResultsArtworks"
import { SearchResultsAuctionsRouteRouteFragmentContainer as SearchResultsAuctionsRoute } from "Apps/Search/Routes/Auctions/SearchResultsAuctions"
import { SearchResultsCategoriesRouteRouteFragmentContainer as SearchResultsCategoriesRoute } from "Apps/Search/Routes/Categories/SearchResultsCategories"
import { SearchResultsCollectionsRouteFragmentContainer as SearchResultsCollectionsRoute } from "Apps/Search/Routes/Collections/SearchResultsCollections"
import { SearchResultsGalleriesRouteRouteFragmentContainer as SearchResultsGalleriesRoute } from "Apps/Search/Routes/Galleries/SearchResultsGalleries"
import { SearchResultsShowsRouteRouteFragmentContainer as SearchResultsShowsRoute } from "Apps/Search/Routes/Shows/SearchResultsShows"
import { RouteConfig } from "found"
import React from "react"
import { graphql } from "react-relay"
import { Provider } from "unstated"
import { FilterState } from "./FilterState"
import { SearchAppFragmentContainer as SearchApp } from "./SearchApp"

const prepareVariables = (params, props) => {
  const paramsFromUrl = props.location ? props.location.query : {}
  const allParams = {
    ...paramsFromUrl,
    ...params,
  }

  allParams.keyword = allParams.term
  return allParams
}

export const routes: RouteConfig[] = [
  {
    path: "/search2",
    Component: SearchApp,
    query: graphql`
      query routes_SearchBarTopLevelQuery($term: String!) {
        viewer {
          ...SearchApp_viewer @arguments(term: $term)
        }
      }
    `,
    prepareVariables,
    children: [
      {
        path: "/",
        Component: SearchResultsArtworksRoute,
        render: ({ props, Component }) => {
          if (!props) {
            return null
          }

          const currentFilterState = props.location.query
          currentFilterState.keyword = currentFilterState.term
          return (
            <Provider inject={[new FilterState(currentFilterState)]}>
              <Component viewer={(props as any).viewer} />
            </Provider>
          )
        },
        query: graphql`
          query routes_SearchResultsArtworksQuery(
            $keyword: String!
            $medium: String
            $major_periods: [String]
            $partner_id: ID
            $for_sale: Boolean
            $sort: String
            $at_auction: Boolean
            $acquireable: Boolean
            $offerable: Boolean
            $inquireable_only: Boolean
            $price_range: String
            $height: String
            $width: String
            $artist_id: String
            $attribution_class: [String]
            $color: String
          ) {
            viewer {
              ...SearchResultsArtworks_viewer
                @arguments(
                  keyword: $keyword
                  medium: $medium
                  major_periods: $major_periods
                  partner_id: $partner_id
                  for_sale: $for_sale
                  sort: $sort
                  at_auction: $at_auction
                  acquireable: $acquireable
                  offerable: $offerable
                  inquireable_only: $inquireable_only
                  price_range: $price_range
                  height: $height
                  width: $width
                  artist_id: $artist_id
                  attribution_class: $attribution_class
                  color: $color
                )
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "artists",
        Component: SearchResultsArtistsRoute,
        query: graphql`
          query routes_SearchResultsArtistsQuery($term: String!) {
            viewer {
              ...SearchResultsArtists_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "collections",
        Component: SearchResultsCollectionsRoute,
        query: graphql`
          query routes_SearchResultsCollectionsQuery($term: String!) {
            viewer {
              ...SearchResultsCollections_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "shows",
        Component: SearchResultsShowsRoute,
        query: graphql`
          query routes_SearchResultsShowsQuery($term: String!) {
            viewer {
              ...SearchResultsShows_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "galleries",
        Component: SearchResultsGalleriesRoute,
        query: graphql`
          query routes_SearchResultsGalleriesQuery($term: String!) {
            viewer {
              ...SearchResultsGalleries_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "categories",
        Component: SearchResultsCategoriesRoute,
        query: graphql`
          query routes_SearchResultsCategoriesQuery($term: String!) {
            viewer {
              ...SearchResultsCategories_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "articles",
        Component: SearchResultsArticlesRoute,
        query: graphql`
          query routes_SearchResultsArticlesQuery($term: String!) {
            viewer {
              ...SearchResultsArticles_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
      {
        path: "auctions",
        Component: SearchResultsAuctionsRoute,
        query: graphql`
          query routes_SearchResultsAuctionsQuery($term: String!) {
            viewer {
              ...SearchResultsAuctions_viewer @arguments(term: $term)
            }
          }
        `,
        prepareVariables,
      },
    ],
  },
]
