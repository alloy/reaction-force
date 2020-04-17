import cookie from "cookies-js"
import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import {
  ArtsyMarkIcon,
  BellIcon,
  Box,
  Button,
  color,
  EnvelopeIcon,
  Flex,
  Link,
  SoloIcon,
  space,
  Spacer,
} from "@artsy/palette"

import { SystemContext } from "Artsy/SystemContext"
import { SearchBarQueryRenderer as SearchBar } from "Components/Search/SearchBar"

import {
  DropDownNavMenu,
  MobileNavMenu,
  MobileToggleIcon,
  MoreNavMenu,
  NotificationsMenu,
  UserMenu,
} from "./Menus"

import { ModalType } from "Components/Authentication/Types"
import { menuData, MenuLinkData } from "Components/NavBar/menuData"
import { openAuthModal } from "Utils/openAuthModal"

import { NavItem } from "./NavItem"
import { NotificationsBadge } from "./NotificationsBadge"

import { AuthIntent, ContextModule } from "@artsy/cohesion"
import { AnalyticsSchema } from "Artsy"
import { track, useTracking } from "Artsy/Analytics"
import Events from "Utils/Events"
import { useMedia } from "Utils/Hooks/useMedia"
import { userHasLabFeature } from "Utils/user"

export const NavBar: React.FC = track(
  {
    flow: AnalyticsSchema.Flow.Header,
    context_module: AnalyticsSchema.ContextModule.Header,
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)(() => {
  const { trackEvent } = useTracking()
  const { mediator, user, EXPERIMENTAL_APP_SHELL } = useContext(SystemContext)
  const [showMobileMenu, toggleMobileNav] = useState(false)
  const { xs, sm } = useMedia()
  const isMobile = xs || sm
  const isLoggedIn = Boolean(user)
  const conversationsEnabled = userHasLabFeature(
    user,
    "User Conversations View"
  )
  const canViewNewDropDown = userHasLabFeature(user, "Updated Navigation")
  const {
    links: [artworks, artists],
  } = menuData

  const getNotificationCount = () => cookie.get("notification-count") || 0

  // Close mobile menu if dragging window from small size to desktop
  useEffect(() => {
    if (!isMobile) {
      toggleMobileNav(false)
    }
  }, [isMobile])

  /**
   * Check to see if we're clicking a link that lives within the new app shell
   * and close the navbar.
   *
   * TODO: Find a less naive way to check if route is in appshell
   */
  const handleMobileNavClick = event => {
    // FIXME: Remove once experimental A/B test completes
    if (EXPERIMENTAL_APP_SHELL) {
      // Includes /collect or /collections
      if (event.target?.parentNode?.href?.includes("/collect")) {
        toggleMobileNav(false)
      }
    }
  }

  return (
    <header>
      <NavBarContainer px={1}>
        <NavSection>
          <Link href="/" style={{ display: "flex" }}>
            <ArtsyMarkIcon height={40} width={40} />
          </Link>
        </NavSection>

        <Spacer mr={1} />

        <NavSection width="100%">
          <Box width="100%">
            <SearchBar />
          </Box>
        </NavSection>

        <Spacer mr={2} />

        {/*
          Desktop. Collapses into mobile at `sm` breakpoint.
        */}
        <NavSection display={["none", "none", "flex"]}>
          <NavSection>
            {canViewNewDropDown ? (
              <NavItem
                isFullScreenDropDown
                Menu={() => {
                  return (
                    <Box>
                      <DropDownNavMenu
                        width="100vw"
                        menu={(artworks as MenuLinkData).menu}
                        contextModule={
                          AnalyticsSchema.ContextModule.HeaderArtworksDropdown
                        }
                      />
                    </Box>
                  )
                }}
              >
                Artworks
              </NavItem>
            ) : (
              <NavItem href="/collect">Artworks</NavItem>
            )}

            {canViewNewDropDown ? (
              <NavItem
                isFullScreenDropDown
                Menu={() => {
                  return (
                    <Box>
                      <DropDownNavMenu
                        width="100vw"
                        menu={(artists as MenuLinkData).menu}
                        contextModule={
                          AnalyticsSchema.ContextModule.HeaderArtistsDropdown
                        }
                      />
                    </Box>
                  )
                }}
              >
                Artists
              </NavItem>
            ) : (
              <NavItem href="/artists">Artists</NavItem>
            )}

            <NavItem href="/auctions">Auctions</NavItem>
            <NavItem href="/articles">Editorial</NavItem>
            <NavItem
              Menu={() => {
                return (
                  <Box mr={-150}>
                    <MoreNavMenu width={160} />
                  </Box>
                )
              }}
            >
              More
            </NavItem>
          </NavSection>

          <NavSection>
            {isLoggedIn && (
              <>
                <NavItem
                  href="/works-for-you"
                  Menu={NotificationsMenu}
                  Overlay={NotificationsBadge}
                  onClick={() => {
                    trackEvent({
                      action_type: AnalyticsSchema.ActionType.Click,
                      subject: AnalyticsSchema.Subject.NotificationBell,
                      new_notification_count: getNotificationCount(),
                      destination_path: "/works-for-you",
                    })
                  }}
                >
                  {({ hover }) => {
                    if (hover) {
                      trackEvent({
                        action_type: AnalyticsSchema.ActionType.Hover,
                        subject: AnalyticsSchema.Subject.NotificationBell,
                        new_notification_count: getNotificationCount(),
                      })
                    }
                    return (
                      <BellIcon
                        top={3}
                        fill={hover ? "purple100" : "black80"}
                      />
                    )
                  }}
                </NavItem>
                {conversationsEnabled && (
                  <NavItem href="/user/conversations">
                    {({ hover }) => {
                      return (
                        <EnvelopeIcon
                          top={3}
                          fill={hover ? "purple100" : "black80"}
                        />
                      )
                    }}
                  </NavItem>
                )}
                <NavItem Menu={UserMenu}>
                  {({ hover }) => {
                    if (hover) {
                      trackEvent({
                        action_type: AnalyticsSchema.ActionType.Hover,
                        subject: "User",
                      })
                    }
                    return (
                      <SoloIcon
                        top={3}
                        fill={hover ? "purple100" : "black80"}
                      />
                    )
                  }}
                </NavItem>
              </>
            )}
          </NavSection>

          {!isLoggedIn && (
            <NavSection>
              <Spacer mr={2} />
              <Button
                variant="secondaryOutline"
                onClick={() => {
                  openAuthModal(mediator, {
                    mode: ModalType.login,
                    intent: AuthIntent.login,
                    contextModule: ContextModule.header,
                  })
                }}
              >
                Log in
              </Button>
              <Spacer mr={1} />
              <Button
                onClick={() => {
                  openAuthModal(mediator, {
                    mode: ModalType.signup,
                    intent: AuthIntent.signup,
                    contextModule: ContextModule.header,
                  })
                }}
              >
                Sign up
              </Button>
            </NavSection>
          )}
        </NavSection>

        {/*
          Mobile. Triggers at the `sm` breakpoint.
        */}
        <NavSection display={["flex", "flex", "none"]}>
          <NavItem
            className="mobileHamburgerButton"
            onClick={() => {
              const showMenu = !showMobileMenu
              if (showMenu) {
                trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
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
          <MobileNavMenu
            isOpen={showMobileMenu}
            menuData={menuData}
            onNavButtonClick={handleMobileNavClick}
          />
        </>
      )}
    </header>
  )
})

export const NavBarHeight = space(6) - 1 // border offset

const NavSection = ({ children, ...props }) => (
  <Flex alignItems="center" {...props}>
    {children}
  </Flex>
)

const NavBarContainer = styled(Flex)`
  background-color: ${color("white100")};
  border-bottom: 1px solid ${color("black10")};
  position: relative;
  z-index: 3;
  height: ${NavBarHeight}px;
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
