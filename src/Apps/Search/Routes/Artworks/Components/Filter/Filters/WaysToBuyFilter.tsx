import { Box, Checkbox, Sans } from "@artsy/palette"
import { FilterState, State } from "Apps/Search/FilterState"
import React from "react"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof State
}

interface Props {
  filters: FilterState
}

export class WaysToBuyFilter extends React.Component<Props> {
  onSelect(type, value) {
    const { filters } = this.props
    filters.setFilter(type, value)
  }

  render() {
    const { filters } = this.props
    const ways: WayToBuy[] = [
      {
        disabled: false,
        name: "Buy now",
        state: "acquireable",
      },
      {
        disabled: false,
        name: "Make offer",
        state: "offerable",
      },
      {
        disabled: filters.isRangeSelected("price_range"),
        name: "Bid",
        state: "at_auction",
      },
      {
        disabled: false,
        name: "Inquire",
        state: "inquireable_only",
      },
    ]

    const constructCheckboxes = () =>
      ways.map((way, index) => {
        const props = {
          disabled: way.disabled,
          key: index,
          onSelect: value => this.onSelect(way.state, value),
          selected: filters.state[way.state],
        }

        return <Checkbox {...props}>{way.name}</Checkbox>
      })

    return (
      <Box mb={1}>
        <Sans size="2" weight="medium" color="black100" my={1}>
          Ways to buy
        </Sans>
        {constructCheckboxes()}
      </Box>
    )
  }
}
