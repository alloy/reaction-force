import { Box, color, Flex, Menu, MenuItem } from "@artsy/palette"
import { AnalyticsSchema, ContextModule } from "Artsy"
import { useTracking } from "Artsy/Analytics/useTracking"
import React from "react"
import styled from "styled-components"
import { DropDownSection } from "./DropDownSection"

interface DropDownNavMenuProps {
  width?: string
  menu: any
  contextModule: ContextModule
}

export const DropDownNavMenu: React.FC<DropDownNavMenuProps> = ({
  width = "100%",
  menu,
  contextModule,
}) => {
  const { trackEvent } = useTracking()

  const trackClick = event => {
    const link = event.target
    const text = link.textContent
    const href = link.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: contextModule,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu onClick={trackClick} width={width}>
      <Flex justifyContent="center">
        <SimpleLinksContainer py={4} mr={[4, 4, 4, 6]}>
          <Box mr={[2, 2, 3, 3]} width={[110, 110, 110, 135, 150]}>
            {menu.links.map(menuItem => {
              if (!menuItem.menu) {
                return (
                  <MenuItemContainer mb={1} key={menuItem.text}>
                    <MenuItem
                      px={0}
                      py={0}
                      href={menuItem.href}
                      textColor={color("black60")}
                      textWeight="regular"
                      fontSize="3t"
                    >
                      {menuItem.text}
                    </MenuItem>
                  </MenuItemContainer>
                )
              }
            })}
          </Box>
        </SimpleLinksContainer>

        {menu.links.map(subMenu => {
          if (subMenu.menu) {
            return <DropDownSection key={subMenu.text} section={subMenu} />
          }
        })}
      </Flex>
    </Menu>
  )
}

export const MenuItemContainer = styled(Box)``

const SimpleLinksContainer = styled(Box)`
  border-right: 1px solid ${color("black10")};
  ${MenuItemContainer} {
    &:last-child {
      margin-top: 130px;
      text-decoration: underline;
      color: ${color("black100")};
    }
  }
`
