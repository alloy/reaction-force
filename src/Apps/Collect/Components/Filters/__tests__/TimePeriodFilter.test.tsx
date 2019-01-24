import { Radio } from "@artsy/palette"
import { mount } from "enzyme"
import React from "react"
import { ContextProvider } from "../../../../../Artsy/SystemContext"
import { FilterState, initialState } from "../../../FilterState"
import { TimePeriodFilter } from "../TimePeriodFilter"

describe("TimePeriodFilter", () => {
  const tracking = { trackEvent: jest.fn() }
  const filterState = new FilterState({ ...initialState, tracking })
  const mediator = { trigger: jest.fn() }
  let timePeriodFilter = mount(
    <ContextProvider mediator={mediator}>
      <TimePeriodFilter filters={filterState} />
    </ContextProvider>
  )

  it("displays the correct number o Radio components for Time Periods", () => {
    expect(timePeriodFilter.find(Radio).length).toBe(15)
  })

  it("filters out incorrect years", () => {
    timePeriodFilter = mount(
      <ContextProvider mediator={mediator}>
        <TimePeriodFilter
          filters={filterState}
          timePeriods={["2910", "2010", "2000"]}
        />
      </ContextProvider>
    )

    expect(timePeriodFilter.find(Radio).length).toBe(2)
  })

  it("updates the state with the correct time period", done => {
    timePeriodFilter
      .find(Radio)
      .at(0)
      .simulate("click")

    timePeriodFilter.update()

    setTimeout(() => {
      expect(filterState.state.major_periods[0]).toBe("2010")
      done()
    })
  })

  it("only shows passed in time periods if available", () => {
    timePeriodFilter = mount(
      <ContextProvider mediator={mediator}>
        <TimePeriodFilter
          filters={filterState}
          timePeriods={["2010", "2000"]}
        />
      </ContextProvider>
    )

    expect(timePeriodFilter.find(Radio).length).toBe(2)
  })
})
