import React from "react"
import { StorybooksRouter } from "Router/StorybooksRouter"
import { storiesOf } from "storybook/storiesOf"
import { RouteTab, RouteTabs } from "Styleguide/Components/RouteTabs"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Legacy/Styleguide/Components", module).add("Tabs (Router)", () => {
  return (
    <React.Fragment>
      <Section title="Route Tabs">
        <StorybooksRouter
          initialRoute="/cv"
          routes={[
            {
              path: "/",
              Component: () => {
                return (
                  <RouteTabs>
                    <RouteTab to="/overview">Overview</RouteTab>
                    <RouteTab to="/cv">CV</RouteTab>
                    <RouteTab to="/shows">Shows</RouteTab>
                  </RouteTabs>
                )
              },
              children: [
                {
                  path: "/overview",
                },
                {
                  path: "/cv",
                },
                {
                  path: "/shows",
                },
              ],
            },
          ]}
        />
      </Section>
    </React.Fragment>
  )
})
