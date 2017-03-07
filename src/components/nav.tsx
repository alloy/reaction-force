import * as React from "react"
import styled from "styled-components"
import colors from "../assets/colors"
import Icon from "./icon"

const Nav = styled.div`
  border-bottom: 1px solid ${ colors.grayRegular };
  display: flex;
`

const NavIcon = styled.div`
  border-right: 1px solid ${ colors.grayRegular };
  display: inline-block;
  font-size: 32px;
  padding: 10px 5px 5px 5px;
  margin-right: 10px;
`

const NavBar: React.SFC<any> = props => (
  <Nav>
    <NavIcon>
      <Icon name="logo" color="black" fontSize="32px" />
    </NavIcon>
    {props.children}
  </Nav>
)

export default NavBar
