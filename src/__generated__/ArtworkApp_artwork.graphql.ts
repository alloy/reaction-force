/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { ArtistInfo_artist$ref } from "./ArtistInfo_artist.graphql";
import { ArtworkBanner_artwork$ref } from "./ArtworkBanner_artwork.graphql";
import { ArtworkDetails_artwork$ref } from "./ArtworkDetails_artwork.graphql";
import { ArtworkImageBrowser_artwork$ref } from "./ArtworkImageBrowser_artwork.graphql";
import { ArtworkMeta_artwork$ref } from "./ArtworkMeta_artwork.graphql";
import { ArtworkRelatedArtists_artwork$ref } from "./ArtworkRelatedArtists_artwork.graphql";
import { ArtworkSidebar_artwork$ref } from "./ArtworkSidebar_artwork.graphql";
import { OtherWorks_artwork$ref } from "./OtherWorks_artwork.graphql";
import { PricingContext_artwork$ref } from "./PricingContext_artwork.graphql";
declare const _ArtworkApp_artwork$ref: unique symbol;
export type ArtworkApp_artwork$ref = typeof _ArtworkApp_artwork$ref;
export type ArtworkApp_artwork = {
    readonly id: string;
    readonly _id: string;
    readonly is_acquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly availability: string | null;
    readonly price: string | null;
    readonly is_in_auction: boolean | null;
    readonly artists: ReadonlyArray<({
        readonly id: string;
        readonly " $fragmentRefs": ArtistInfo_artist$ref;
    }) | null> | null;
    readonly artist: ({
        readonly " $fragmentRefs": ArtistInfo_artist$ref;
    }) | null;
    readonly " $fragmentRefs": ArtworkRelatedArtists_artwork$ref & ArtworkMeta_artwork$ref & ArtworkBanner_artwork$ref & ArtworkSidebar_artwork$ref & ArtworkDetails_artwork$ref & ArtworkImageBrowser_artwork$ref & OtherWorks_artwork$ref & PricingContext_artwork$ref;
    readonly " $refType": ArtworkApp_artwork$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "FragmentSpread",
  "name": "ArtistInfo_artist",
  "args": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtworkApp_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ArtworkRelatedArtists_artwork",
      "args": null
    },
    v0,
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_acquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_offerable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "availability",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "price",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "is_in_auction",
      "args": null,
      "storageKey": null
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
        v0,
        v1,
        v2
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        v1,
        v2
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "_id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkMeta_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkBanner_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkSidebar_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkDetails_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "OtherWorks_artwork",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "PricingContext_artwork",
      "args": null
    },
    v2
  ]
};
})();
(node as any).hash = '5097a7c9d398cce1abd797fc91661166';
export default node;
