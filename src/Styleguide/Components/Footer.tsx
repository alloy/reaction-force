import { Flex, Sans, Separator, Serif, space, Spacer } from "@artsy/palette"
import { ContextConsumer } from "Artsy/Router"
import { Mediator } from "Artsy/SystemContext"
import React from "react"
import styled from "styled-components"
import { FlexDirectionProps } from "styled-system"
import { WeChatIcon } from "Styleguide/Elements/icons"
import { FacebookIcon } from "Styleguide/Elements/icons/FacebookIcon"
import { InstagramIcon } from "Styleguide/Elements/icons/InstagramIcon"
import { TwitterIcon } from "Styleguide/Elements/icons/TwitterIcon"
import { Mark } from "Styleguide/Elements/Logo"
import { Media } from "Utils/Responsive"

interface Props {
  mediator?: Mediator
}

export const Footer: React.SFC<Props> = props => {
  return (
    <ContextConsumer>
      {({ mediator }) => {
        return (
          <>
            <Media at="xs">
              <SmallFooter mediator={mediator} />
            </Media>
            <Media greaterThan="xs">
              <LargeFooter mediator={mediator} />
            </Media>
          </>
        )
      }}
    </ContextConsumer>
  )
}

export const LargeFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="row" />
)

export const SmallFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="column" />
)

const FooterContainer: React.SFC<FlexDirectionProps & Props> = props => {
  return (
    <React.Fragment>
      <Flex
        flexDirection={props.flexDirection}
        justifyContent="space-between"
        width="100%"
      >
        <Flex flexDirection="column" mb={1}>
          <Sans size="2" weight="medium">
            Buy
          </Sans>
          <Serif size="2">
            <Link
              onClick={() => props.mediator.trigger("openCollectorFAQModal")}
            >
              Buying from Galleries FAQ
            </Link>
            <Link onClick={() => props.mediator.trigger("openAuctionFAQModal")}>
              Buying from Auctions FAQ
            </Link>
            <Link href="https://www.artsy.net/consign">Consign with Artsy</Link>
          </Serif>
        </Flex>
        <Flex flexDirection="column" mb={1}>
          <Sans size="2" weight="medium">
            Learn
          </Sans>
          <Serif size="2">
            <Link href="https://www.artsy.net/artsy-education">Education</Link>
            <Link href="https://www.artsy.net/categories">
              The Art Genome Project
            </Link>
          </Serif>
        </Flex>
        <Flex flexDirection="column" mb={1}>
          <Sans size="2" weight="medium">
            About us
          </Sans>
          <Serif size="2">
            <Link href="https://www.artsy.net/about">About</Link>
            <Link href="https://medium.com/artsy-blog">Blog</Link>
            <Link href="https://www.artsy.net/about/jobs">Jobs</Link>
            <Link href="https://artsy.github.com/open-source">Open Source</Link>
            <Link href="https://www.artsy.net/about/press">Press</Link>
            <Link href="https://www.artsy.net/contact">Contact</Link>
            <Link onClick={() => props.mediator.trigger("openFeedbackModal")}>
              Send us feedback
            </Link>
          </Serif>
        </Flex>
        <Flex flexDirection="column" mb={1}>
          <Sans size="2" weight="medium">
            Partners
          </Sans>
          <Serif size="2">
            <Link href="https://www.artsy.net/gallery-partnerships">
              Artsy for Galleries
            </Link>
            <Link href="https://www.artsy.net/institution-partnerships">
              Artsy for Museums
            </Link>
            <Link href="https://www.artsy.net/auction-partnerships">
              Artsy for Auctions
            </Link>
          </Serif>
        </Flex>
        <Media at="xs">
          <Flex mb={1}>
            <PolicyLinks />
          </Flex>
        </Media>
      </Flex>
      <Separator mt={1} mb={2} />
      <Flex justifyContent="space-between">
        <Flex alignItems="center" mb={4}>
          <Media at="xs">
            <Mark width="20px" height="20px" mr={2} />
          </Media>
          <Media greaterThan="xs">
            <Mark width="30px" height="30px" mr={2} />
            <Spacer mr={1} />
            <PolicyLinks />
          </Media>
        </Flex>
        <Flex>
          <WeChatIcon width={space(2)} height={space(2)} mr={1} />
          <a href="https://twitter.com/artsy">
            <TwitterIcon width={space(2)} height={space(2)} mr={1} />
          </a>
          <a href="https://www.facebook.com/artsy">
            <FacebookIcon width={space(2)} height={space(2)} mr={1} />
          </a>
          <a href="https://www.instagram.com/artsy/">
            <InstagramIcon width={space(2)} height={space(2)} mr={1} />
          </a>
        </Flex>
      </Flex>
    </React.Fragment>
  )
}

const Link = styled.a`
  display: block;
  margin-top: ${space(1)}px;
  margin-bottom: ${space(1)}px;
  text-decoration: none;
`

const UnstyledLink = styled.a`
  text-decoration: none;
  white-space: nowrap;
`

const PolicyLinks = () => (
  <React.Fragment>
    <Serif size="2">© 2018 Artsy</Serif>
    <Spacer mr={1} />
    <UnstyledLink href="https://www.artsy.net/terms">
      <Serif size="2">Terms of Use</Serif>
    </UnstyledLink>
    <Spacer mr={1} />
    <UnstyledLink href="https://www.artsy.net/privacy">
      <Serif size="2">Privacy Policy</Serif>
    </UnstyledLink>
    <Spacer mr={1} />
    <UnstyledLink href="https://www.artsy.net/security">
      <Serif size="2">Security</Serif>
    </UnstyledLink>
  </React.Fragment>
)
