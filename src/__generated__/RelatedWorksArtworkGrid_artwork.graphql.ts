/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkGrid_artworks$ref } from "./ArtworkGrid_artworks.graphql";
declare const _RelatedWorksArtworkGrid_artwork$ref: unique symbol;
export type RelatedWorksArtworkGrid_artwork$ref = typeof _RelatedWorksArtworkGrid_artwork$ref;
export type RelatedWorksArtworkGrid_artwork = {
    readonly layers: ReadonlyArray<{
        readonly name: string | null;
        readonly id: string;
    } | null> | null;
    readonly layer: {
        readonly name: string | null;
        readonly artworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                } | null;
            } | null> | null;
            readonly " $fragmentRefs": ArtworkGrid_artworks$ref;
        } | null;
    } | null;
    readonly " $refType": RelatedWorksArtworkGrid_artwork$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "RelatedWorksArtworkGrid_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "layerId",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "layers",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkLayer",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "layer",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "layerId"
        }
      ],
      "concreteType": "ArtworkLayer",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "artworksConnection",
          "storageKey": "artworksConnection(first:8)",
          "args": [
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
                    (v1/*: any*/)
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
})();
(node as any).hash = 'e5bdffd3541deeb7ba8a7babb5dd0d8e';
export default node;
