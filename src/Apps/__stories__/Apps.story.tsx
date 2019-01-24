import { storiesOf } from "@storybook/react"
import { MockRouter } from "DevTools/MockRouter"
import React from "react"
import { routes as artistRoutes } from "../Artist/routes"
import { routes as collectRoutes } from "../Collect/routes"
import { routes as collectionsRoutes } from "../Collections/routes"

storiesOf("Apps", module)
  .add("Artist Page", () => {
    return (
      <MockRouter
        routes={artistRoutes}
        initialRoute="/artist/pablo-picasso"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collect Page", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collect"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collection Page", () => {
    return (
      <MockRouter
        routes={collectRoutes}
        initialRoute="/collection/street-art-now"
        context={{
          mediator: {
            trigger: x => x,
          },
        }}
      />
    )
  })
  .add("Collections Page", () => {
    return (
      <MockRouter
        routes={collectionsRoutes}
        initialRoute="/collections"
        context={{}}
      />
    )
  })
