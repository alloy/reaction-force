/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtworkSharePanel_artwork$ref } from "./ArtworkSharePanel_artwork.graphql";
import { Save_artwork$ref } from "./Save_artwork.graphql";
declare const _ArtworkActions_artwork$ref: unique symbol;
export type ArtworkActions_artwork$ref = typeof _ArtworkActions_artwork$ref;
export type ArtworkActions_artwork = {
    readonly artists: ReadonlyArray<({
        readonly name: string | null;
    }) | null> | null;
    readonly date: string | null;
    readonly title: string | null;
    readonly image: ({
        readonly id: string | null;
    }) | null;
    readonly href: string | null;
    readonly is_downloadable: boolean | null;
    readonly sale: ({
        readonly is_closed: boolean | null;
        readonly is_auction: boolean | null;
    }) | null;
    readonly " $fragmentRefs": Save_artwork$ref & ArtworkSharePanel_artwork$ref;
    readonly " $refType": ArtworkActions_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkActions_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Save_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSharePanel_artwork",
      "args": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artists",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "date",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
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
          "name": "id",
          "args": null,
          "storageKey": null
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
      "name": "is_downloadable",
      "args": null,
      "storageKey": null
    },
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
          "name": "is_closed",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "is_auction",
          "args": null,
          "storageKey": null
        },
        v0
      ]
    },
    v0
  ]
};
})();
(node as any).hash = '36f386aa88325c82e264a13489577509';
export default node;
