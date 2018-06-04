import styled from "styled-components"
import { Grid } from "react-styled-flexboxgrid"
import React from "react"
import Text from "../../../Text"
import colors from "../../../../Assets/Colors"

export const StyledGrid = Grid.extend`
  padding: 38px 158px 51px;
`
export const Contact = () => (
  <Text color={colors.graySemibold} textSize="medium" align="center">
    Questions? Email{" "}
    <Link href="mailto:orders@artsy.net">orders@artsy.net.</Link>
  </Text>
)

const Link = styled.a`
  text-decoration: none;
  color: ${colors.graySemibold};
`
