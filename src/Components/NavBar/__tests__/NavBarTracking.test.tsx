import { mount } from "enzyme"
import React from "react"

import { AnalyticsSchema, SystemContextProvider } from "Artsy"

import { useTracking } from "Artsy/Analytics/useTracking"
import { QueryRenderer as _QueryRenderer } from "react-relay"
import { MobileNavMenu, MoreNavMenu, UserMenu } from "../Menus"
import { NavBar } from "../NavBar"
import { NavItem } from "../NavItem"

jest.mock("Artsy/Analytics/useTracking")

describe("NavBarTracking", () => {
  const trackEvent = jest.fn()

  const Wrapper = ({ children, user = { id: "foo" } }) => {
    return (
      <SystemContextProvider user={user} mediator={{ trigger: jest.fn() }}>
        {children}
      </SystemContextProvider>
    )
  }

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return { trackEvent }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe("NavBar", () => {
    it("tracks NavBar notification badge clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find("Link")
        .find({ href: "/works-for-you" })
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        subject: AnalyticsSchema.Subject.NotificationBell,
        destination_path: "/works-for-you",
      })
    })

    it("tracks NavBar login button clicks", () => {
      const wrapper = mount(
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find("Button")
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        subject: AnalyticsSchema.Subject.Login,
      })
    })

    it("tracks NavBar signup button clicks", () => {
      const wrapper = mount(
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find("Button")
        .last()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        subject: AnalyticsSchema.Subject.Signup,
      })
    })
  })

  describe("MoreNavMenu", () => {
    it("tracks MoreNavMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <MoreNavMenu />
        </Wrapper>
      )
      const menuItems = wrapper.find("MenuItem")
      menuItems.first().simulate("click", {
        target: {
          context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
          parentNode: {
            parentNode: {
              getAttribute: () => "/galleries",
            },
          },
        },
      })
      expect(trackEvent).toBeCalledWith({
        context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
        destination_path: "/galleries",
      })
    })
  })

  describe("UserMenu", () => {
    it("tracks UserMenu clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <UserMenu />
        </Wrapper>
      )
      const menuItems = wrapper.find("MenuItem")
      menuItems.first().simulate("click", {
        target: {
          parentNode: {
            parentNode: {
              getAttribute: () => "/user/saves",
            },
          },
        },
      })
      expect(trackEvent).toBeCalledWith({
        context_module: AnalyticsSchema.ContextModule.HeaderUserDropdown,
        destination_path: "/user/saves",
      })
    })
  })

  describe("NavItem", () => {
    it("tracks NavItem item clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <NavItem href="/art-fairs">Fairs</NavItem>
        </Wrapper>
      )

      wrapper.find("NavItem").simulate("click")

      expect(trackEvent).toBeCalledWith({
        subject: "Fairs",
        destination_path: "/art-fairs",
      })
    })
  })

  describe("Mobile", () => {
    it("tracks show mobile menu hamburger button clicks", () => {
      const wrapper = mount(
        <Wrapper user={null}>
          <NavBar />
        </Wrapper>
      )
      wrapper
        .find(".mobileHamburgerButton")
        .first()
        .simulate("click")

      expect(trackEvent).toBeCalledWith({
        subject: AnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
      })
    })

    it("tracks mobile dropdown clicks", () => {
      const wrapper = mount(
        <Wrapper>
          <MobileNavMenu />
        </Wrapper>
      )

      wrapper
        .find("MobileLink")
        .last()
        .simulate("click", {
          target: {
            innerText: "Magazine",
            parentNode: {
              getAttribute: () => "/articles",
            },
          },
        })

      expect(trackEvent).toBeCalledWith({
        subject: "Magazine",
        destination_path: "/articles",
      })
    })
  })
})
