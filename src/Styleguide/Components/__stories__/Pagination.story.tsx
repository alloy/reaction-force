import { paginationProps } from "Apps/__test__/Fixtures/Pagination"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { LargePagination, Pagination, SmallPagination } from "../Pagination"

storiesOf("Legacy/Styleguide/Components", module).add("Pagination", () => {
  const { cursor, callbacks } = paginationProps

  return (
    <React.Fragment>
      <Section title="Responsive">
        <Pagination pageCursors={cursor} {...callbacks} />
      </Section>
      <Section title="Large Pagination">
        <LargePagination pageCursors={cursor} {...callbacks} />
      </Section>
      <Section title="Small Pagination">
        <SmallPagination pageCursors={cursor} {...callbacks} />
      </Section>
    </React.Fragment>
  )
})
