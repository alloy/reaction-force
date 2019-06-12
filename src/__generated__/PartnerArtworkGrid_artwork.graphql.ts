/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _PartnerArtworkGrid_artwork$ref: unique symbol;
export type PartnerArtworkGrid_artwork$ref = typeof _PartnerArtworkGrid_artwork$ref;
export type PartnerArtworkGrid_artwork = {
    readonly partner: {
        readonly artworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        } | null;
        readonly href: string | null;
        readonly name: string | null;
    } | null;
    readonly " $refType": PartnerArtworkGrid_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "PartnerArtworkGrid_artwork",
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
      "name": "partner",
      "storageKey": null,
      "args": null,
      "concreteType": "Partner",
      "plural": false,
      "selections": [
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
            },
            {
              "kind": "Literal",
              "name": "for_sale",
              "value": true
            },
            {
              "kind": "Literal",
              "name": "sort",
              "value": "PUBLISHED_AT_DESC"
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
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '1d601ec42eddc7c9ec69441b09fb82f6';
export default node;
