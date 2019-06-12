/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _OfferSummaryItem_order$ref: unique symbol;
export type OfferSummaryItem_order$ref = typeof _OfferSummaryItem_order$ref;
export type OfferSummaryItem_order = {
    readonly totalListPrice: string | null;
    readonly myLastOffer?: {
        readonly amount: string | null;
        readonly note: string | null;
    } | null;
    readonly " $refType": OfferSummaryItem_order$ref;
} & ({
    readonly myLastOffer: {
        readonly amount: string | null;
        readonly note: string | null;
    } | null;
} | {
    /*This will never be '% other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
});



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
];
return {
  "kind": "Fragment",
  "name": "OfferSummaryItem_order",
  "type": "Order",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": (v0/*: any*/),
      "storageKey": "totalListPrice(precision:2)"
    },
    {
      "kind": "InlineFragment",
      "type": "OfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "Offer",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": (v0/*: any*/),
              "storageKey": "amount(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "note",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '90ad44d35301b6a9de545dc7e020855d';
export default node;
