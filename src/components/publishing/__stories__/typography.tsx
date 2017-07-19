import * as React from "react"
import styled from "styled-components"
import Fonts from "../fonts"

function Typography() {
  return (
    <div>
      <GaramondS50>
        Garamond s50: 50px / 1.1em
      </GaramondS50>
      <GaramondS40>
        Garamond s40: 40px / 1.1em
      </GaramondS40>
      <GaramondS23>
        Garamond s23: 23px / 1.5em
      </GaramondS23>
      <GaramondS17>
        Garamond s17: 17px / 1.1em
      </GaramondS17>
      <GaramondS15>
        Garamond s15: 15px / 1.25em
      </GaramondS15>
      <hr />
      <br />
      <AvantGardeS13>
        Avant Garde s13: 13px / 1.1em
      </AvantGardeS13>
      <AvantGardeS11>
        Avant Garde s11: 11px / 1.1em
      </AvantGardeS11>
      <hr />
      <UnicaS130>
        Unica s130: 130px / 1.1em
      </UnicaS130>
      <UnicaS100>
        Unica s100: 100px / 1.1em
      </UnicaS100>
      <UnicaS80>
        Unica s80: 80px / 1.1em
      </UnicaS80>
      <UnicaS69>
        Unica s69: 69px / 1em
      </UnicaS69>
      <UnicaS40>
        Unica s40: 40px / 1.1em
      </UnicaS40>
      <UnicaS19>
        Unica s19: 19px / 1.5em
      </UnicaS19>
      <UnicaS16>
        Unica s16: 16px / 1.1em
      </UnicaS16>
      <UnicaS14>
        Unica s14: 14px / 1.1em
      </UnicaS14>
      <UnicaS12>
        Unica s12: 12px / 1.1em
      </UnicaS12>
    </div>
  )
}
export default Typography

const GaramondS15 = styled.div`
  ${Fonts.garamond("s15")}
  margin-bottom: 20px;
`
const GaramondS17 = styled.div`
  ${Fonts.garamond("s17")}
  margin-bottom: 20px;
`
const GaramondS23 = styled.div`
  ${Fonts.garamond("s23")}
  margin-bottom: 20px;
`
const GaramondS40 = styled.div`
  ${Fonts.garamond("s40")}
  margin-bottom: 20px;
`
const GaramondS50 = styled.div`
  ${Fonts.garamond("s50")}
  margin-bottom: 20px;
`

const AvantGardeS11 = styled.div`
  ${Fonts.avantgarde("s11")}
  margin-bottom: 20px;
`
const AvantGardeS13 = styled.div`
  ${Fonts.avantgarde("s13")}
  margin-bottom: 20px;
`

const UnicaS12 = styled.div`
  ${Fonts.unica("s12")}
  margin-bottom: 20px;
`
const UnicaS14 = styled.div`
  ${Fonts.unica("s14")}
  margin-bottom: 20px;
`
const UnicaS16 = styled.div`
  ${Fonts.unica("s16")}
  margin-bottom: 20px;
`
const UnicaS19 = styled.div`
  ${Fonts.unica("s19")}
  margin-bottom: 20px;
`
const UnicaS40 = styled.div`
  ${Fonts.unica("s40")}
  margin-bottom: 20px;
`
const UnicaS69 = styled.div`
  ${Fonts.unica("s69")}
  margin-bottom: 20px;
`
const UnicaS80 = styled.div`
  ${Fonts.unica("s80")}
  margin-bottom: 20px;
`
const UnicaS100 = styled.div`
  ${Fonts.unica("s100")}
  margin-bottom: 20px;
`
const UnicaS130 = styled.div`
  ${Fonts.unica("s130")}
  margin-bottom: 20px;
`
