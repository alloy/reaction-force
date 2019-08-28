import Events from "../Utils/Events"
import { configure, addParameters } from "@storybook/react"
import { createMediaStyle } from "Utils/Responsive"

const req = require.context("../", true, /\.story\.tsx$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

// Add RRM styles to Storybooks head
const rrmStyle = document.createElement("style")
rrmStyle.innerHTML = createMediaStyle()
document.head.appendChild(rrmStyle)

addParameters({
  inline: true,
  brandTitle: "Reaction",
  showAddonPanel: false,
  sortStoriesByKind: true,
})

setTimeout(() => {
  configure(loadStories, module)
})

Events.onEvent(data => {
  console.log("Tracked event", data)
})

if (!window.sd || !(typeof window.sd === "object")) {
  window.sd = {}
}
