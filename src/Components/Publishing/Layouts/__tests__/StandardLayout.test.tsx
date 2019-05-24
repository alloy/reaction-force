import { DisplayCanvas } from "Components/Publishing/Display/Canvas"
import { DisplayPanel } from "Components/Publishing/Display/DisplayPanel"
import {
  SeriesArticle,
  StandardArticle,
} from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
  RelatedPanel,
} from "Components/Publishing/Fixtures/Components"
import { ReadMoreButton } from "Components/Publishing/ReadMore/ReadMoreButton"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import { cloneDeep, extend } from "lodash"
import React from "react"
import { Sidebar } from "../Components/Sidebar"
import { StandardLayout } from "../StandardLayout"

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)

describe("Standard Article", () => {
  const getWrapper = _props => {
    return mount(<StandardLayout {..._props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: StandardArticle,
      display: Display("standard"),
      isTruncated: false,
      relatedArticlesForCanvas: RelatedCanvas,
      relatedArticlesForPanel: RelatedPanel,
      areHostedAdsEnabled: false,
    }
  })

  afterEach(() => {
    jest.resetModules()
  })

  it("renders sidebar", () => {
    const article = getWrapper(props)
    expect(article.find(Sidebar).length).toBe(1)
  })

  it("renders related articles", () => {
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesPanel).length).toBe(1)
    expect(article.find(RelatedArticlesCanvas).length).toBe(1)
  })

  it("Does not render RelatedArticlesCanvas if article is super", () => {
    props.isSuper = true
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesCanvas).length).toBe(0)
  })

  it("Does not render RelatedArticlesCanvas if article is in a series", () => {
    props.article = extend(cloneDeep(StandardArticle), {
      seriesArticle: SeriesArticle,
    })
    const article = getWrapper(props)
    expect(article.find(RelatedArticlesCanvas).length).toBe(0)
  })

  it("renders display", () => {
    const article = getWrapper(props)
    expect(article.find(DisplayPanel).length).toBe(1)
    expect(article.find(DisplayCanvas).length).toBe(1)
  })

  it("Does not render display if article is in a series", () => {
    props.article = extend(cloneDeep(StandardArticle), {
      seriesArticle: SeriesArticle,
    })
    const article = getWrapper(props)
    expect(article.find(DisplayCanvas).length).toBe(0)
  })

  it("Does not render display if article is super", () => {
    props.isSuper = true
    const article = getWrapper(props)
    expect(article.find(DisplayCanvas).length).toBe(0)
  })

  it("shows read more if truncated", () => {
    props.isTruncated = true
    const article = getWrapper(props)
    expect(article.find(ReadMoreButton).length).toBe(1)
  })

  it("Can remove truncation on click", () => {
    props.isTruncated = true
    const article = getWrapper(props) as any

    article
      .find(ReadMoreButton)
      .at(0)
      .props()
      .onClick()
    expect(article.state().isTruncated).toBeFalsy()
  })
})
