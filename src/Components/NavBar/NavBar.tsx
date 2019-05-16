import cookie from "cookies-js"
import React, { useContext, useState } from "react"
import styled from "styled-components"

import {
  ArtsyMarkIcon,
  BellIcon,
  Box,
  Button,
  color,
  Flex,
  Link,
  MoreIcon,
  SoloIcon,
  Spacer,
} from "@artsy/palette"

import { SystemContext } from "Artsy/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import {
  MobileNavMenu,
  MobileToggleIcon,
  MoreNavMenu,
  NotificationsMenu,
  UserMenu,
} from "./Menus"

import { NavItem } from "./NavItem"
import { NotificationsBadge } from "./NotificationsBadge"
import * as auth from "./Utils/auth"

import { AnalyticsSchema } from "Artsy"
import { AnalyticsProp, provideTracking } from "Artsy/Analytics/TrackingContext"
import { useTracking } from "Artsy/Analytics/useTracking"

export const NavBar: React.FC = provideTracking({
  flow: AnalyticsSchema.Flow.Header,
  context_module: AnalyticsSchema.ContextModule.Header,
})(_props => {
  const { mediator, user } = useContext(SystemContext)
  const { trackEvent } = useTracking()
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const isLoggedIn = Boolean(user)

  return (
    <>
      <NavBarContainer p={1}>
        <NavSection>
          <Link href="/" style={{ display: "flex" }}>
            <ArtsyMarkIcon height={40} width={40} />
          </Link>
        </NavSection>

        <Spacer mr={1} />

        <NavSection width="100%">
          <Box width="100%" maxWidth={570}>
            <SearchBar />
          </Box>
        </NavSection>

        <Spacer mr={3} />

        {/*
          Desktop
        */}
        <NavSection display={["none", "flex"]}>
          <NavSection>
            <NavItem href="/collect">Artworks</NavItem>
            <NavItem href="/auctions">Auctions</NavItem>

            {/**
              Only show Galleries and Fairs at `lg` and `xl`
            */}
            <NavItem href="/galleries" display={["none", "none", "block"]}>
              Galleries
            </NavItem>
            <NavItem
              href="/art-fairs"
              display={["none", "none", "none", "block"]}
            >
              Fairs
            </NavItem>
            <NavItem href="/articles">Magazine</NavItem>
            <NavItem Menu={MoreNavMenu}>
              <MoreIcon top="3px" />
            </NavItem>

            <Spacer mr={3} />

            {isLoggedIn && (
              <>
                <NavItem
                  href="/works-for-you"
                  Menu={NotificationsMenu}
                  Overlay={NotificationsBadge}
                  onClick={() => {
                    trackEvent<
                      AnalyticsProp<{ new_notification_count: string }>
                    >({
                      subject: AnalyticsSchema.Subject.NotificationBell,
                      new_notification_count: cookie.get("notification-count"),
                      destination_path: "/works-for-you",
                    })
                  }}
                >
                  <BellIcon top={3} />
                </NavItem>
                <NavItem Menu={UserMenu}>
                  <SoloIcon top={3} />
                </NavItem>
              </>
            )}
          </NavSection>

          {!isLoggedIn && (
            <NavSection>
              <Button
                variant="secondaryOutline"
                onClick={() => {
                  trackEvent({
                    subject: AnalyticsSchema.Subject.Login,
                  })

                  auth.login(mediator)
                }}
              >
                Log in
              </Button>
              <Spacer mr={1} />
              <Button
                onClick={() => {
                  trackEvent({
                    subject: AnalyticsSchema.Subject.Signup,
                  })

                  auth.signup(mediator)
                }}
              >
                Sign up
              </Button>
            </NavSection>
          )}
        </NavSection>

        {/*
          Mobile
        */}
        <NavSection display={["flex", "none"]}>
          <NavItem
            className="mobileHamburgerButton"
            onClick={() => {
              const showMenu = !showMobileMenu
              if (showMenu) {
                trackEvent({
                  subject: AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
                })
              }

              toggleMobileNav(showMenu)
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              width={22}
              height={22}
            >
              <MobileNavDivider />
              <MobileToggleIcon open={showMobileMenu} />
            </Flex>
          </NavItem>
        </NavSection>
      </NavBarContainer>

      {showMobileMenu && (
        <>
          <MobileNavCover onClick={() => toggleMobileNav(false)} />
          <MobileNavMenu />
        </>
      )}
    </>
  )
})

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const NavBarContainer = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 1;
`

// FIXME: This needs to be cleaned up once we get proper icons
const MobileNavDivider = styled(Box)`
  border-left: 1px solid ${color("black10")};
  height: 63px;
  position: absolute;
  left: -12px;
`

const MobileNavCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(194, 194, 194, 0.3);
  z-index: 0;
`
