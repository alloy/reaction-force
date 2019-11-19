/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
export type ArtistAuctionResultItem_auctionResult = {
    readonly title: string | null;
    readonly dimension_text: string | null;
    readonly organization: string | null;
    readonly images: {
        readonly thumbnail: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly description: string | null;
    readonly date_text: string | null;
    readonly sale_date_text: string | null;
    readonly price_realized: {
        readonly display: string | null;
        readonly cents_usd: number | null;
    } | null;
    readonly estimate: {
        readonly display: string | null;
    } | null;
    readonly " $refType": "ArtistAuctionResultItem_auctionResult";
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtistAuctionResultItem_auctionResult",
  "type": "AuctionResult",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "dimension_text",
      "name": "dimensionText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "organization",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionLotImages",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "thumbnail",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "date_text",
      "name": "dateText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "sale_date_text",
      "name": "saleDateText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "price_realized",
      "name": "priceRealized",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionResultPriceRealized",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": "cents_usd",
          "name": "centsUSD",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "estimate",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionLotEstimate",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    }
  ]
};
})();
(node as any).hash = 'f8c6f69560f22b904a1ed94e57d55fe6';
export default node;
