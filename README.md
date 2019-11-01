```
      :::::::::  ::::::::::     :::      :::::::: ::::::::::: ::::::::::: ::::::::  ::::    :::
     :+:    :+: :+:          :+: :+:   :+:    :+:    :+:         :+:    :+:    :+: :+:+:   :+:
    +:+    +:+ +:+         +:+   +:+  +:+           +:+         +:+    +:+    +:+ :+:+:+  +:+
   +#++:++#:  +#++:++#   +#++:++#++: +#+           +#+         +#+    +#+    +:+ +#+ +:+ +#+
  +#+    +#+ +#+        +#+     +#+ +#+           +#+         +#+    +#+    +#+ +#+  +#+#+#
 #+#    #+# #+#        #+#     #+# #+#    #+#    #+#         #+#    #+#    #+# #+#   #+#+#
###    ### ########## ###     ###  ########     ###     ########### ########  ###    ####
```

## WARNING

This is a medium-term lived release branch. Beware!

Context: https://artsyproduct.atlassian.net/browse/AUCT-722

## Meta

- **State:** production
- **Demo:** <https://artsy.github.io/reaction>
- **CI:** [![CircleCI](https://circleci.com/gh/artsy/reaction.svg?style=shield)](https://circleci.com/gh/artsy/reaction)
  [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fartsy%2Freaction.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fartsy%2Freaction?ref=badge_shield)
- **NPM:** [![npm version](https://badge.fury.io/js/%40artsy%2Freaction.svg)](https://www.npmjs.com/package/@artsy/reaction)
- **Point People:** [@alloy](https://github.com/alloy), [@damassi](https://github.com/damassi)

## Installation

    $ git clone --recursive https://github.com/artsy/reaction.git
    $ cd reaction
    $ npm install -g yarn
    $ yarn install
    $ brew install watchman (If you don't already have Homebrew, go here for installation instructions: https://brew.sh/)
    $ cp .env.oss .env

## Instructions

- Development of components happen in [storybooks](https://getstorybook.io):

        $ yarn start
        $ open http://localhost:9001/

- Run the tests:

        $ yarn test

- Run the tests continuously (or use `vscode-jest`):

        $ yarn test -- --watch

- In vscode, run the `TypeScript: Run type-checker` task and open the `PROBLEMS` view to see continuous type-checker
  results.

- After updating components, be sure to deploy a new demo (sharing is caring!):

        $ yarn deploy-storybook

- When using new changes in metaphysics’ schema, be sure to update the local schema copy:

        $ yarn sync-schema

* There are some suggested VSCode extensions in `.vscode/extensions.json` and additional docs at [docs/vscode.md](docs/vscode.md).

## Developing in Force

_Before you start, you should ensure Force is on the right branch and up-to-date._

Use yarn to kick off the force development process.

```
yarn integrate force
```

This command will build and compile reaction, publish it locally so it can be used
in other places, link it into force for you, and then start reaction and force in watch mode.

This _assumes_ force is a sibling directory of reaction. If it's not you can use the following
setup instead.

```
PROJECT_PATH=path/to/force yarn integrate
```

If you need to attach force to a debugger, use the `ENABLE_DEBUGGER` command as follows

```
ENABLE_DEBUGGER=true yarn integrate force
```

## Manual Linking and Unlinking with Force

To _link_ your local reaction with your local force, run:

        $ yarn link && yarn watch
        (wait until you see a message that X files have been successfully compiled before moving on)

        $ cd ../force && yarn link @artsy/reaction && yarn start

To _unlink_ your local reaction from your local force, run (in **Force**):

        $ yarn unlink @artsy/reaction
        $ yarn add @artsy/reaction
        $ yarn start

## Deployments

Reaction uses [auto-release](https://github.com/intuit/auto-release#readme) to automatically release on every PR. Every PR should have a label that matches one of the following

- Version: Trivial
- Version: Patch
- Version: Minor
- Version: Major

Peril will automatically add "Version: Patch", if you don't set one on creating your PR. No release will happen on a `Trivial` update.

If you're making a change but you don't want to immediate trigger a release (i.e. when 2 PRs need to go out together), specify the correct
version and add the `Skip Release` label. That'll ensure when the next release happens the version is still bumped appropriately.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fartsy%2Freaction.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fartsy%2Freaction?ref=badge_large)

## About Artsy

<a href="https://www.artsy.net/">
  <img align="left" src="https://avatars2.githubusercontent.com/u/546231?s=200&v=4"/>
</a>

This project is the work of engineers at [Artsy][footer_website], the world's
leading and largest online art marketplace and platform for discovering art.
One of our core [Engineering Principles][footer_principles] is being [Open
Source by Default][footer_open] which means we strive to share as many details
of our work as possible.

You can learn more about this work from [our blog][footer_blog] and by following
[@ArtsyOpenSource][footer_twitter] or explore our public data by checking out
[our API][footer_api]. If you're interested in a career at Artsy, read through
our [job postings][footer_jobs]!

[footer_website]: https://www.artsy.net/
[footer_principles]: culture/engineering-principles.md
[footer_open]: culture/engineering-principles.md#open-source-by-default
[footer_blog]: https://artsy.github.io/
[footer_twitter]: https://twitter.com/ArtsyOpenSource
[footer_api]: https://developers.artsy.net/
[footer_jobs]: https://www.artsy.net/jobs
