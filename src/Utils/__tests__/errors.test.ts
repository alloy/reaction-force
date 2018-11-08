import * as Sentry from "@sentry/browser"
import { isErrorInfo, sendErrorToService } from "Utils/errors"

jest.mock("@sentry/browser")

describe("errors", () => {
  describe("#isErrorInfo", () => {
    it("returns true if an object implements the ErrorInfo interface", () => {
      const errorInfo = { componentStack: "someString", anotherKey: 0 }
      expect(isErrorInfo(errorInfo)).toBe(true)
    })
    it("returns false if an object does not implement the ErrorInfo interface", () => {
      const notErrorInfo = { anotherKey: 0 }
      expect(isErrorInfo(notErrorInfo)).toBe(false)
    })
  })
  describe("#sendErrorToService", () => {
    it("sends an error to Sentry", () => {
      const errorInfo = { componentStack: "more error info" }
      sendErrorToService(new Error("msg"), errorInfo)
      expect(Sentry.withScope).toHaveBeenCalled()
    })
  })
})
