import { storiesOf } from "@storybook/react"
import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { FilterState } from "../Artist/Routes/Overview/state"

storiesOf("Apps", module)
  .add("Artwork Page", () => {
    return (
      <StorybooksRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/pablo-picasso-david-et-bethsabee"
      />
    )
  })
  .add("Artist Page", () => {
    const filterState = new FilterState()
    // TODO: This currently only changes the UI, the first fetch isn’t taking
    //       this state into account.
    filterState.state.for_sale = true
    return (
      <StorybooksRouter
        routes={artistRoutes}
        initialRoute="/artist2/andy-warhol"
        initialAppState={{ mediator: { trigger: x => x } }}
        initialState={[filterState]}
      />
    )
  })
