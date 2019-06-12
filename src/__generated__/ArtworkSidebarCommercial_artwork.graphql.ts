/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { ArtworkSidebarSizeInfo_piece$ref } from "./ArtworkSidebarSizeInfo_piece.graphql";
declare const _ArtworkSidebarCommercial_artwork$ref: unique symbol;
export type ArtworkSidebarCommercial_artwork$ref = typeof _ArtworkSidebarCommercial_artwork$ref;
export type ArtworkSidebarCommercial_artwork = {
    readonly id: string;
    readonly _id: string;
    readonly is_acquireable: boolean | null;
    readonly is_inquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly price: string | null;
    readonly sale_message: string | null;
    readonly shippingInfo: string | null;
    readonly shippingOrigin: string | null;
    readonly edition_sets: ReadonlyArray<{
        readonly id: string;
        readonly __id: string;
        readonly is_acquireable: boolean | null;
        readonly is_offerable: boolean | null;
        readonly sale_message: string | null;
        readonly " $fragmentRefs": ArtworkSidebarSizeInfo_piece$ref;
    } | null> | null;
    readonly " $refType": ArtworkSidebarCommercial_artwork$ref;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_acquireable",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "is_offerable",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "sale_message",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkSidebarCommercial_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    (v1/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_inquireable",
      "args": null,
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "price",
      "args": null,
      "storageKey": null
    },
    (v3/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shippingInfo",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shippingOrigin",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edition_sets",
      "storageKey": null,
      "args": null,
      "concreteType": "EditionSet",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "__id",
          "args": null,
          "storageKey": null
        },
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "kind": "FragmentSpread",
          "name": "ArtworkSidebarSizeInfo_piece",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'c26a481dd5578776811cf868f1eead42';
export default node;
