import { storiesOf } from "@storybook/react"
import { routes as artistRoutes } from "Apps/Artist/routes"
import { routes as artworkRoutes } from "Apps/Artwork/routes"
import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"

storiesOf("Legacy/Apps", module)
  .add("Artwork Page", () => {
    return (
      <StorybooksRouter
        routes={artworkRoutes}
        initialRoute="/artwork2/pablo-picasso-david-et-bethsabee"
      />
    )
  })
  .add("Artist Page", () => {
    return (
      <StorybooksRouter
        routes={artistRoutes}
        initialRoute="/artist2/keith-haring"
        initialState={{ mediator: { trigger: x => x } }}
      />
    )
  })
