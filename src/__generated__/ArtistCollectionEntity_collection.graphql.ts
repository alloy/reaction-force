/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ArtistCollectionEntity_collection$ref: unique symbol;
export type ArtistCollectionEntity_collection$ref = typeof _ArtistCollectionEntity_collection$ref;
export type ArtistCollectionEntity_collection = {
    readonly headerImage: string | null;
    readonly slug: string;
    readonly title: string;
    readonly price_guidance: number | null;
    readonly artworks: {
        readonly hits: ReadonlyArray<{
            readonly artist: {
                readonly name: string | null;
            } | null;
            readonly title: string | null;
            readonly image: {
                readonly url: string | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": ArtistCollectionEntity_collection$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtistCollectionEntity_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "headerImage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "price_guidance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworks",
      "storageKey": "artworks(size:3,sort:\"merchandisability\")",
      "args": [
        {
          "kind": "Literal",
          "name": "size",
          "value": 3
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "merchandisability"
        }
      ],
      "concreteType": "FilterArtworks",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "hits",
          "storageKey": null,
          "args": null,
          "concreteType": "Artwork",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artist",
              "storageKey": null,
              "args": null,
              "concreteType": "Artist",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "name",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            (v0/*: any*/),
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
                  "name": "url",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": "small"
                    }
                  ],
                  "storageKey": "url(version:\"small\")"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '235c0ba8408305088395703809dbdb18';
export default node;
