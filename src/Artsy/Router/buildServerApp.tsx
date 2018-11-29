import { createEnvironment } from "Artsy/Relay/createEnvironment"
import { Boot } from "Artsy/Router/Components/Boot"
import queryMiddleware from "farce/lib/queryMiddleware"
import { Resolver } from "found-relay"
import createRender from "found/lib/createRender"
import { getFarceResult } from "found/lib/server"
import { getLoadableState } from "loadable-components/server"
import React, { ComponentType } from "react"
import ReactDOMServer from "react-dom/server"
import serialize from "serialize-javascript"
import { getUser } from "Utils/getUser"
import { createMediaStyle } from "Utils/Responsive"
import { trace } from "Utils/trace"
import { RouterConfig } from "./"

interface Resolve {
  ServerApp?: ComponentType<any>
  redirect?: {
    url: string
  }
  status?: number
  headTags?: any[]
  scripts?: string
}

// No need to invoke this for each request.
const MediaStyle = createMediaStyle()

export function buildServerApp(config: RouterConfig): Promise<Resolve> {
  return trace(
    "buildServerApp",
    new Promise(async (resolve, reject) => {
      try {
        const { context = {}, routes = [], url } = config
        const { initialMatchingMediaQueries, user } = context
        const _user = getUser(user)
        const relayEnvironment = createEnvironment({ user: _user })
        const historyMiddlewares = [queryMiddleware]
        const resolver = new Resolver(relayEnvironment)
        const render = createRender({})
        const headTags = [<style type="text/css">{MediaStyle}</style>]

        const { redirect, status, element } = await trace(
          "buildServerApp.farceResults",
          getFarceResult({
            url,
            historyMiddlewares,
            routeConfig: routes,
            resolver,
            render,
          })
        )

        if (redirect) {
          resolve({
            redirect,
            // TODO: The docs seem to indicate that if there’s a redirect there
            //       will not be a status.
            //       https://github.com/4Catalyzer/found#server-side-rendering
            status,
          })
          return
        }

        const App = props => {
          return (
            <Boot
              context={context}
              user={_user}
              headTags={headTags}
              initialMatchingMediaQueries={initialMatchingMediaQueries}
              relayEnvironment={relayEnvironment}
              resolver={resolver}
              routes={routes}
            >
              {element}
            </Boot>
          )
        }

        const { relayData, loadableState } = await trace(
          "buildServerApp.fetch",
          (async () => {
            // Kick off relay requests to prime cache
            ReactDOMServer.renderToString(<App />)
            // Serializable data to be rehydrated on client
            const data = await relayEnvironment.relaySSRMiddleware.getCache()
            const state = await getLoadableState(<App />)
            return { relayData: data, loadableState: state }
          })()
        )

        const scripts = []
        loadableState && scripts.push(loadableState.getScriptTag())
        scripts.push(`
          <script>
            var __RELAY_BOOTSTRAP__ = ${serializeRelayData(relayData)};
          </script>
        `)

        /**
         * FIXME: Relay SSR middleware is passing a _res object across which
         * has circular references, leading to issues *ONLY* on staging / prod
         * which can't be reproduced locally. This strips out _res as a quickfix
         * though this should be PR'd back at relay-modern-network-modern-ssr.
         */
        try {
          relayData.forEach(item => {
            item.forEach(i => {
              delete i._res
            })
          })
        } catch (error) {
          console.error(
            "[Artsy/Router/buildServerApp] Error cleaning data",
            error
          )
        }

        resolve({
          ServerApp: props => <App {...props} />,
          status,
          headTags,
          scripts: scripts.join("\n"),
        })
      } catch (error) {
        console.error("[Artsy/Router/buildServerApp] Error:", error)
        reject(error)
      }
    })
  )
}

function serializeRelayData(relayData: any) {
  let hydrationData
  try {
    hydrationData = serialize(relayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"
    console.error(
      "reaction/Router/buildServerApp Error serializing data:",
      error
    )
  }
  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
