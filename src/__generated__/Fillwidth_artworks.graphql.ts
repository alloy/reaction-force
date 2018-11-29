/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { FillwidthItem_artwork$ref } from "./FillwidthItem_artwork.graphql";
declare const _Fillwidth_artworks$ref: unique symbol;
export type Fillwidth_artworks$ref = typeof _Fillwidth_artworks$ref;
export type Fillwidth_artworks = {
    readonly edges: ReadonlyArray<({
        readonly node: ({
            readonly __id: string;
            readonly image: ({
                readonly aspect_ratio: number;
            }) | null;
            readonly " $fragmentRefs": FillwidthItem_artwork$ref;
        }) | null;
    }) | null> | null;
    readonly " $refType": Fillwidth_artworks$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Fillwidth_artworks",
  "type": "ArtworkConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Artwork",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "__id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "image",
              "storageKey": null,
              "args": null,
              "concreteType": "Image",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "aspect_ratio",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "FragmentSpread",
              "name": "FillwidthItem_artwork",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '2c137b96505cd1aae9b4750ecf6bacc7';
export default node;
