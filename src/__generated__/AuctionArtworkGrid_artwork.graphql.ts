/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _AuctionArtworkGrid_artwork$ref: unique symbol;
export type AuctionArtworkGrid_artwork$ref = typeof _AuctionArtworkGrid_artwork$ref;
export type AuctionArtworkGrid_artwork = {
    readonly sale: {
        readonly href: string | null;
        readonly artworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        } | null;
    } | null;
    readonly " $refType": AuctionArtworkGrid_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "AuctionArtworkGrid_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "excludeArtworkIDs",
      "type": "[String!]",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworksConnection",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "exclude",
              "variableName": "excludeArtworkIDs"
            },
            {
              "kind": "Literal",
              "name": "first",
              "value": 8
            }
          ],
          "concreteType": "ArtworkConnection",
          "plural": false,
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
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                }
              ]
            },
            {
              "kind": "FragmentSpread",
              "name": "ArtworkGrid_artworks",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '574cf83b49d6d325fe788fc409cd6162';
export default node;
