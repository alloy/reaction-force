import * as React from "react"
import { createFragmentContainer, graphql, RelayPaginationProp } from "react-relay"
import styled from "styled-components"

import Dropdown from "../ArtworkFilter/Dropdown"
import ForSaleCheckbox from "../ArtworkFilter/ForSaleCheckbox"

import Headline from "../ArtworkFilter/Headline"
import TotalCount from "../ArtworkFilter/TotalCount"

import BorderedPulldown from "../BorderedPulldown"

import TagArtworksContent from "./TagArtworksContent"

interface Filters {
  for_sale?: boolean
  dimension_range?: string
  price_range?: string
  medium?: string
}

interface Props extends RelayProps, Filters {
  relay?: RelayPaginationProp
  onDropdownSelected: (slice: string, value: string) => void
  onSortSelected: (sort: string) => void
  onForSaleToggleSelected: () => void
  sort?: string
}

interface State extends Filters {
  loading: boolean
}

const FilterBar = styled.div`
  vertical-align: middle;
  text-align: center;

  > div {
    display: inline-block;
  }
`

const SubFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0 20px;
  align-items: center;
`

export class TagArtworks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  renderDropdown() {
    return this.props.tag.filtered_artworks.aggregations.map(aggregation => {
      return (
        <Dropdown
          aggregation={aggregation}
          key={aggregation.slice}
          selected={aggregation.slice && this.props[aggregation.slice.toLowerCase()]}
          onSelected={this.props.onDropdownSelected}
        />
      )
    })
  }

  renderForSaleToggle() {
    return <ForSaleCheckbox checked={this.props.for_sale} onChange={this.props.onForSaleToggleSelected} />
  }

  renderArtworks() {
    const pulldownOptions = [
      { val: "-partner_updated_at", name: "Recently Updated" },
      { val: "-year", name: "Artwork Year (desc.)" },
      { val: "year", name: "Artwork Year (asc.)" },
    ]
    const selectedSort = pulldownOptions.find(sort => sort.val === this.props.sort)
    return (
      <div>
        <SubFilterBar>
          <div>
            <Headline
              medium={this.props.medium}
              price_range={this.props.price_range}
              dimension_range={this.props.dimension_range}
              for_sale={this.props.for_sale}
              facet={this.props.tag.filtered_artworks.facet}
              aggregations={this.props.tag.filtered_artworks.aggregations}
            />
            <TotalCount filter_artworks={this.props.tag.filtered_artworks} />
          </div>
          <BorderedPulldown
            defaultValue="Recently Updated"
            selectedName={selectedSort && selectedSort.name}
            options={pulldownOptions}
            onChange={this.props.onSortSelected}
          />
        </SubFilterBar>
        <TagArtworksContent tagID={this.props.tag.id} filtered_artworks={this.props.tag.filtered_artworks as any} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <FilterBar>
          {this.renderForSaleToggle()}
          {this.renderDropdown()}
        </FilterBar>
        {this.renderArtworks()}
      </div>
    )
  }
}

export default createFragmentContainer(TagArtworks, {
  tag: graphql`
    fragment TagArtworks_tag on Tag
      @argumentDefinitions(
        for_sale: { type: "Boolean" }
        medium: { type: "String", defaultValue: "*" }
        aggregations: { type: "[ArtworkAggregation]", defaultValue: [MEDIUM, TOTAL, PRICE_RANGE, DIMENSION_RANGE] }
        price_range: { type: "String", defaultValue: "*" }
        dimension_range: { type: "String", defaultValue: "*" }
      ) {
      id
      filtered_artworks(
        aggregations: $aggregations
        for_sale: $for_sale
        medium: $medium
        price_range: $price_range
        dimension_range: $dimension_range
        size: 0
      ) {
        ...TotalCount_filter_artworks
        ...TagArtworksContent_filtered_artworks
        aggregations {
          slice
          counts {
            name
            id
          }
          ...Dropdown_aggregation
        }
        facet {
          ...Headline_facet
        }
      }
    }
  `,
})

interface RelayProps {
  tag: {
    id: string
    filtered_artworks: {
      aggregations: Array<{
        slice: string
        counts: {
          name: string | null
          id: string | null
        }
      }>
      facet: any
    }
  }
}
