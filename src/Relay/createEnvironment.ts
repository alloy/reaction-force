import "isomorphic-fetch"
import "regenerator-runtime/runtime"

import RelayServerSSR from "react-relay-network-modern-ssr/lib/server"
import RelayClientSSR from "react-relay-network-modern-ssr/lib/client"
import { Environment, RecordSource, Store } from "relay-runtime"
import { NetworkError } from "../Utils/errors"
import { data as sd } from "sharify"

import {
  RelayNetworkLayer,
  urlMiddleware,
  cacheMiddleware,
  loggerMiddleware,
} from "react-relay-network-modern"

interface Config {
  cache?: object
  user?: User
  checkStatus?: boolean
}

interface RelayEnvironment extends Environment {
  relaySSRMiddleware: RelayClientSSR | RelayServerSSR
}

export function createEnvironment(config: Config = {}) {
  const { cache = {}, checkStatus, user } = config
  const isServer = typeof window === "undefined"
  const relaySSRMiddleware = isServer
    ? new RelayServerSSR()
    : new RelayClientSSR(cache)

  relaySSRMiddleware.debug = false

  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Reaction",
  }

  const url = isServer
    ? process.env.METAPHYSICS_ENDPOINT
    : sd.METAPHYSICS_ENDPOINT

  const network = new RelayNetworkLayer([
    urlMiddleware({
      url,
      headers: !!user
        ? {
            ...headers,
            "X-USER-ID": user && user.id,
            "X-ACCESS-TOKEN": user && user.accessToken,
          }
        : headers,
    }),
    relaySSRMiddleware.getMiddleware({
      lookup: true,
    }),
    cacheMiddleware({
      size: 100, // max 100 requests
      ttl: 900000, // 15 minutes
    }),

    // TODO: This has been moved over from `Utils/metaphysics` but can eventually
    // be replaced by error / retry middleware
    next => async req => {
      const response = await next(req)

      if (!checkStatus || (response.status >= 200 && response.status < 300)) {
        return response
      } else {
        const error = new NetworkError(response.statusText)
        error.response = response
        throw error
      }
    },
    // TODO: Audit logging
    !isServer && loggerMiddleware(),
  ])

  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  }) as RelayEnvironment

  environment.relaySSRMiddleware = relaySSRMiddleware

  return environment
}
