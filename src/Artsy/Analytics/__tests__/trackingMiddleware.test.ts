import ActionTypes from "farce/lib/ActionTypes"
import { trackingMiddleware } from "../trackingMiddleware"

declare const global: any

jest.mock("sharify", () => ({
  data: {
    APP_URL: "http://testing.com",
  },
}))

describe("trackingMiddleware", () => {
  const analytics = window.analytics
  const store = {
    getState: () => ({}),
  }
  const noop = x => x

  beforeEach(() => {
    window.analytics = { page: jest.fn() }
  })

  afterEach(() => {
    window.analytics = analytics
  })

  it("tracks pageviews", () => {
    trackingMiddleware()(store)(noop)({
      type: ActionTypes.UPDATE_LOCATION,
      payload: {
        pathname: "/foo",
      },
    })

    expect(global.analytics.page).toBeCalledWith(
      {
        path: "/foo",
        url: "http://testing.com/foo",
      },
      { integrations: { Marketo: false } }
    )
  })

  it("does not track pageviews for other events", () => {
    trackingMiddleware()(store)(noop)({
      type: ActionTypes.PUSH,
      payload: {
        pathname: "/bar",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })

  it("excludes paths based on config option", () => {
    trackingMiddleware({
      excludePaths: ["/artwork/"],
    })(store)(noop)({
      type: ActionTypes.UPDATE_LOCATION,
      payload: {
        pathname: "/artwork/some-id",
      },
    })
    expect(global.analytics.page).not.toBeCalled()
  })

  // TODO: Remove after EXPERIMENTAL_APP_SHELL AB test ends.
  describe("referrers", () => {
    it("tracks collect, collection and collections", () => {
      const pathsToTest = ["/collect", "/collection/foo", "/collections"]

      pathsToTest.forEach(pathToTest => {
        trackingMiddleware()({
          getState: () => {
            return {
              found: {
                match: {
                  location: {
                    pathname: "/referrer",
                    search: "?with=queryparams",
                  },
                },
              },
            }
          },
        })(noop)({
          type: ActionTypes.UPDATE_LOCATION,
          payload: {
            pathname: pathToTest,
          },
        })

        expect(global.analytics.page).toBeCalledWith(
          {
            path: pathToTest,
            referrer: `http://testing.com/referrer?with=queryparams`,
            url: `http://testing.com${pathToTest}`,
          },
          { integrations: { Marketo: false } }
        )

        expect(window.analytics.__artsyReferrer).toEqual(
          "http://testing.com/referrer?with=queryparams"
        )
      })
    })
  })
})
