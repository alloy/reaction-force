import { IdentityVerificationAppQueryResponseFixture } from "Apps/IdentityVerification/__fixtures__/routes_IdentityVerificationAppQuery"
import { createMockNetworkLayer2 } from "DevTools"
import { Resolver } from "found-relay"
import {
  FarceElementResult,
  FarceRedirectResult,
  getFarceResult,
} from "found/lib/server"
import { Environment, RecordSource, Store } from "relay-runtime"

import { routes } from "Apps/IdentityVerification/routes"

import { routes_IdentityVerificationAppQueryRawResponse } from "__generated__/routes_IdentityVerificationAppQuery.graphql"
import { createRender } from "found"

describe("IdentityVerification/routes", () => {
  const idvID =
    IdentityVerificationAppQueryResponseFixture.me.identityVerification
      .internalID
  async function render(
    url,
    mockData: routes_IdentityVerificationAppQueryRawResponse
  ) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })

    return (await getFarceResult({
      url,
      routeConfig: routes,
      resolver: new Resolver(environment),
      render: createRender({}),
    })) as Partial<FarceRedirectResult & FarceElementResult>
  }

  it("renders the Identity Verification landing page", async () => {
    const { status } = await render(
      `/identity-verification/${idvID}`,
      IdentityVerificationAppQueryResponseFixture
    )

    expect(status).toBe(200)
  })
})
