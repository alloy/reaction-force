import React from "react"
import { Box, Spacer, Join } from "@artsy/palette"
import { ViewingRoomWorksFragmentContainer as ViewingRoomWorks } from "./Components/ViewingRoomWorks"
import { ViewingRoomIntroFragmentContainer as ViewingRoomIntro } from "./Components/ViewingRoomIntro"
import { ViewingRoomPullQuoteFragmentContainer as ViewingRoomPullQuote } from "./Components/ViewingRoomPullQuote"
import { ViewingRoomSubsectionsFragmentContainer as ViewingRoomSubsections } from "./Components/ViewingRoomSubsections"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomStatementRoute_viewingRoom } from "__generated__/ViewingRoomStatementRoute_viewingRoom.graphql"

interface ViewingRoomStatementRouteProps {
  viewingRoom: ViewingRoomStatementRoute_viewingRoom
}

const StatementRoute: React.FC<ViewingRoomStatementRouteProps> = ({
  viewingRoom,
}) => {
  return (
    <Box>
      <Box maxWidth={["100%", 470]} px={[2, 0]} m="auto">
        <Join separator={<Spacer my={4} />}>
          <ViewingRoomIntro viewingRoom={viewingRoom} />
          <ViewingRoomWorks viewingRoom={viewingRoom} />
          <ViewingRoomPullQuote viewingRoom={viewingRoom} />
          <ViewingRoomSubsections viewingRoom={viewingRoom} />
        </Join>
      </Box>
      <Spacer my={4} />
    </Box>
  )
}

export const ViewingRoomStatementRouteFragmentContainer = createFragmentContainer(
  StatementRoute,
  {
    viewingRoom: graphql`
      fragment ViewingRoomStatementRoute_viewingRoom on ViewingRoom {
        ...ViewingRoomIntro_viewingRoom
        ...ViewingRoomWorks_viewingRoom
        ...ViewingRoomPullQuote_viewingRoom
        ...ViewingRoomSubsections_viewingRoom
      }
    `,
  }
)
