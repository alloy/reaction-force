import artsyPassport from "artsy-passport"
import artsyXapp from "artsy-xapp"
import { NextFunction, Request, Response } from "express"
import IsomorphicRelay from "isomorphic-relay"
import React from "react"

import CurrentUserRoute from "../../../Relay/Queries/CurrentUser"

import ForgotPasswordContainer from "../Containers/ForgotPassword"
import InquiriesContainer from "../Containers/Inquiries"
import LoginContainer from "../Containers/Login"
import ThankYouContainer from "../Containers/ThankYou"

import { markCollectorAsLoyaltyApplicant } from "./Gravity"
import render from "./Render"

import * as Artsy from "../../../Components/Artsy"
import { FormData, LoginResponseLocalData } from "../Types"

export function Home(req: Request, res: Response, next: NextFunction) {
  return res.redirect(req.baseUrl + "/inquiries")
}

export function ThankYou(req: Request, res: Response, next: NextFunction) {
  const { CURRENT_USER } = res.locals.sd

  if (!CURRENT_USER) {
    const { loginPagePath } = artsyPassport.options
    return res.redirect(req.baseUrl + loginPagePath)
  }

  const profile = CURRENT_USER.profile

  if (!profile.loyalty_applicant_at) {
    return res.redirect(req.baseUrl) // TODO add test: baseUrl already has "/loyalty" so no need to append it.
  }

  return res.send(
    render(
      <ThankYouContainer profile={profile} userName={CURRENT_USER.name} recentApplicant={req.query.recent_applicant} />,
      { baseURL: req.baseUrl, sharify: res.locals.sharify }
    )
  )
}

export function Inquiries(req: Request, res: Response, next: NextFunction) {
  const { CURRENT_USER } = res.locals.sd

  if (!CURRENT_USER) {
    const { loginPagePath } = artsyPassport.options
    return res.redirect(req.baseUrl + loginPagePath)
  }

  const profile = CURRENT_USER.profile
  if (profile.loyalty_applicant_at) {
    return res.redirect(req.baseUrl + "/thank-you")
  }

  if (profile.confirmed_buyer_at) {
    markCollectorAsLoyaltyApplicant(CURRENT_USER.accessToken)
      .then(() => {
        res.redirect(req.baseUrl + "/thank-you")
      })
      .catch(err => next(err))
  } else {
    IsomorphicRelay.prepareData(
      {
        Container: InquiriesContainer,
        queryConfig: new CurrentUserRoute(),
      },
      res.locals.networkLayer
    )
      .then(({ data, props }) => {
        res.locals.sharify.data.RELAY_DATA = data
        return res.send(
          render(
            <Artsy.ContextProvider currentUser={CURRENT_USER}>
              <IsomorphicRelay.Renderer {...props} />
            </Artsy.ContextProvider>,
            {
              entrypoint: req.baseUrl + "/bundles/inquiries.js",
              sharify: res.locals.sharify,
              baseURL: req.baseUrl,
            }
          )
        )
      })
      .catch(err => next(err))
  }
}

export function Login(req: Request, res: Response, next: NextFunction) {
  const { facebookPath, twitterPath } = artsyPassport.options

  const formConfig: FormData = {
    baseUrl: req.baseUrl,
    url: `${req.baseUrl + req.path}?redirect-to=${req.baseUrl + "/inquiries/"}`,
    forgotPasswordUrl: req.baseUrl + "/forgot-password",
    csrfToken: req.csrfToken(),
    facebookPath,
    twitterPath,
  }

  const data = res.locals.sd as LoginResponseLocalData
  data.FORM_DATA = formConfig

  return res.send(
    render(<LoginContainer form={formConfig} />, {
      entrypoint: req.baseUrl + "/bundles/login.js",
      sharify: res.locals.sharify,
      baseURL: req.baseUrl,
    })
  )
}

export function ForgotPassword(req: Request, res: Response, next: NextFunction) {
  const submitUrl = process.env.API_URL + "/api/v1/users/send_reset_password_instructions"

  res.locals.sharify.data.SUBMIT_URL = submitUrl
  res.locals.sharify.data.APP_TOKEN = artsyXapp.token

  return res.send(
    render(<ForgotPasswordContainer submitEmailUrl={submitUrl} appToken={artsyXapp.token} />, {
      entrypoint: req.baseUrl + "/bundles/forgot_password.js",
      baseURL: req.baseUrl,
      sharify: res.locals.sharify,
    })
  )
}
