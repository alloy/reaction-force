/**
 * FIXME: This file also used to handle ‘profile’ follows, as implemented in https://github.com/artsy/reaction/pull/175,
 * but this was reverted because the metaphysics PR never landed https://github.com/artsy/metaphysics/pull/662.
 *
 * When this is revisited, rather than having this file do both, it’s probably better to have an abstract implementation
 * and two specialised components that use composition to achieve the desired functionality.
 */

import React from "react"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"

import Icon from "./Icon"

import styled from "styled-components"
import colors from "../Assets/Colors"

import * as Artsy from "../Components/Artsy"

const SIZE = 32

interface Props
  extends RelayProps,
    React.HTMLProps<FollowButton>,
    Artsy.ContextProps {
  style?: any
  relay?: any
}

export class FollowButton extends React.Component<Props, null> {
  handleFollow() {
    const { artist, currentUser, relay } = this.props
    if (currentUser && currentUser.id) {
      commitMutation(relay.environment, {
        mutation: graphql`
          mutation FollowArtistMutation($input: FollowArtistInput!) {
            followArtist(input: $input) {
              artist {
                is_followed
              }
            }
          }
        `,
        variables: {
          input: {
            artist_id: artist.id,
            unfollow: artist.is_followed,
          },
        },
        // TODO: Relay Modern: This is not working yet
        optimisticResponse: {
          followArtist: {
            artist: {
              __id: artist.__id,
              is_followed: !artist.is_followed,
            },
          },
        },
      })
    } else {
      window.location.href = "/login"
    }
  }

  render() {
    const { style, artist } = this.props
    const iconName = artist.is_followed
      ? "follow-circle.is-following"
      : "follow-circle"

    return (
      <div
        className={this.props.className}
        style={style}
        onClick={() => this.handleFollow()}
        data-followed={artist.is_followed}
      >
        <Icon
          name={iconName}
          height={SIZE}
          style={{ verticalAlign: "middle", color: "inherit", margin: 0 }}
        />
      </div>
    )
  }
}

interface RelayProps {
  artist: {
    __id: string
    id: string
    is_followed: boolean | null
  }
}

export const StyledFollowButton = styled(FollowButton)`
  display: flex;
  cursor: pointer;
  color: black;
  font-size: 16px;
  align-items: center;
  margin-left: 5px;
  &:after {
    content: "Follow";
  }
  &:hover {
    color: ${colors.purpleRegular};
  }
  &[data-followed="true"] {
    &:after {
      content: "Following";
    }
    &:hover {
      color: ${colors.redBold};
      &:after {
        content: "Unfollow";
      }
    }
  }
`

export default createFragmentContainer(
  Artsy.ContextConsumer(StyledFollowButton),
  graphql`
    fragment Follow_artist on Artist {
      __id
      id
      is_followed
    }
  `
)
