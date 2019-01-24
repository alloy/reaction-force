import { storiesOf } from "@storybook/react"
import { Article } from "Components/Publishing/Article"
import { clone, extend } from "lodash"
import React from "react"

import {
  BasicArticle,
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  SeriesArticle,
  StandardArticle,
  SuperArticle,
} from "../Fixtures/Articles"

import { ContextProvider } from "Artsy"
import {
  Display,
  HeroSections,
  RelatedCanvas,
  RelatedPanel,
} from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const story = storiesOf("Publishing/Articles/Standard", module)
  .add("Standard", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </ContextProvider>
    )
  })
  .add("Super Article", () => {
    const article = extend({}, SuperArticle, { hero_section: HeroSections[2] })
    return (
      <ContextProvider>
        <Article
          article={article}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isSuper
        />
      </ContextProvider>
    )
  })
  .add("In series", () => {
    const article = clone({
      ...StandardArticle,
      seriesArticle: SeriesArticle,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <ContextProvider>
        <Article article={article} />
      </ContextProvider>
    )
  })
  .add("Without Vertical", () => {
    return (
      <ContextProvider>
        <Article
          article={MissingVerticalStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </ContextProvider>
    )
  })
  .add("Truncated", () => {
    return (
      <ContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </ContextProvider>
    )
  })
  .add("With tooltips", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </ContextProvider>
    )
  })

const displays = ["overlay", "image", "video", "slideshow"]
displays.forEach(displayType => {
  story.add(`With ${displayType} ad`, () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          display={Display(displayType)}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </ContextProvider>
    )
  })
})

story.add(`Multiple articles`, () => {
  const article: ArticleData = {
    ...StandardArticle,
    sections: [
      {
        type: "text",
        body: "<p>What would Antoine Court?</p>",
      },
    ],
  }

  return (
    <ContextProvider>
      <div>
        <Article
          article={article}
          display={Display("slideshow")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
        <Article
          article={article}
          display={Display("video")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
        <Article
          article={article}
          display={Display("image")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </div>
    </ContextProvider>
  )
})
