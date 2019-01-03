          :::::::::  ::::::::::     :::      :::::::: ::::::::::: ::::::::::: ::::::::  ::::    :::
         :+:    :+: :+:          :+: :+:   :+:    :+:    :+:         :+:    :+:    :+: :+:+:   :+:
        +:+    +:+ +:+         +:+   +:+  +:+           +:+         +:+    +:+    +:+ :+:+:+  +:+
       +#++:++#:  +#++:++#   +#++:++#++: +#+           +#+         +#+    +#+    +:+ +#+ +:+ +#+
      +#+    +#+ +#+        +#+     +#+ +#+           +#+         +#+    +#+    +#+ +#+  +#+#+#
     #+#    #+# #+#        #+#     #+# #+#    #+#    #+#         #+#    #+#    #+# #+#   #+#+#
    ###    ### ########## ###     ###  ########     ###     ########### ########  ###    ####

## Meta

- **State:** development
- **Demo:** <https://artsy.github.io/reaction>
- **CI:** [![CircleCI](https://circleci.com/gh/artsy/reaction.svg?style=shield)](https://circleci.com/gh/artsy/reaction)
- **NPM:** [![npm version](https://badge.fury.io/js/%40artsy%2Freaction.svg)](https://www.npmjs.com/package/@artsy/reaction)
- **Point People:** [@alloy](https://github.com/alloy), [@l2succes](https://github.com/l2succes) & [@damassi](https://github.com/damassi)

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

## Linking and Unlinking with Force

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

No release will happen on a `Trivial` update.

## Emitting types

We recently started shipping Reaction builds with declaration files (`.d.ts`) so consumers have access to the interfaces and types we add to our components. Because of that, you will notice errors resembling the following:

```typescript
src/Components/Forms/OrderForm/App.tsx:63:14 - error TS4023: Exported variable 'StyledTitle' has or is using name 'TitleProps' from external module "/Users/lucsucces/Projects/reaction/src/Components/Title" but cannot be named.

63 export const StyledTitle = styled(Title)`
                ~~~~~~~~~~~
```

What that error essentially means because you are exporting `StyledTitle`, the interface `TitleProps` also needs to be exported. You can learn more about declarations files [here](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

##### Exporting interfaces

This also affects a bit how we declare our interfaces. Instead using a private `Props` interface as we've been doing

```typescript
interface Props {
  ...
}

export class Icon extends Component<Props> {
  ...
}
```

you should write that instead

```typescript
export interface IconProps {
  ...
}

export class Icon extends Component<IconProps> {
  ...
}
```

The more descriptive interface name (`IconProps`) will get more useful error messages from the compiler when something goes wrong,
and it's clearer which interface is being referred to in type defintion files.
