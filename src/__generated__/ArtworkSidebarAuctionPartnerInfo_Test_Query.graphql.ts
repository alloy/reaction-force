/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { ArtworkSidebarAuctionPartnerInfo_artwork$ref } from "./ArtworkSidebarAuctionPartnerInfo_artwork.graphql";
export type ArtworkSidebarAuctionPartnerInfo_Test_QueryVariables = {};
export type ArtworkSidebarAuctionPartnerInfo_Test_QueryResponse = {
    readonly artwork: ({
        readonly " $fragmentRefs": ArtworkSidebarAuctionPartnerInfo_artwork$ref;
    }) | null;
};
export type ArtworkSidebarAuctionPartnerInfo_Test_Query = {
    readonly response: ArtworkSidebarAuctionPartnerInfo_Test_QueryResponse;
    readonly variables: ArtworkSidebarAuctionPartnerInfo_Test_QueryVariables;
};



/*
query ArtworkSidebarAuctionPartnerInfo_Test_Query {
  artwork(id: "auction_artwork_estimate_premium") {
    ...ArtworkSidebarAuctionPartnerInfo_artwork
    __id
  }
}

fragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {
  partner {
    name
    __id
  }
  sale_artwork {
    estimate
    __id
  }
  sale {
    _id
    is_closed
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "auction_artwork_estimate_premium",
    "type": "String!"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
  "id": null,
  "text": "query ArtworkSidebarAuctionPartnerInfo_Test_Query {\n  artwork(id: \"auction_artwork_estimate_premium\") {\n    ...ArtworkSidebarAuctionPartnerInfo_artwork\n    __id\n  }\n}\n\nfragment ArtworkSidebarAuctionPartnerInfo_artwork on Artwork {\n  partner {\n    name\n    __id\n  }\n  sale_artwork {\n    estimate\n    __id\n  }\n  sale {\n    _id\n    is_closed\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtworkSidebarAuctionPartnerInfo_artwork",
            "args": null
          },
          v1
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtworkSidebarAuctionPartnerInfo_Test_Query",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artwork",
        "storageKey": "artwork(id:\"auction_artwork_estimate_premium\")",
        "args": v0,
        "concreteType": "Artwork",
        "plural": false,
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
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              v1
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "sale_artwork",
            "storageKey": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "estimate",
                "args": null,
                "storageKey": null
              },
              v1
            ]
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
                "name": "_id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "is_closed",
                "args": null,
                "storageKey": null
              },
              v1
            ]
          },
          v1
        ]
      }
    ]
  }
};
})();
(node as any).hash = '61df51c013d5fd8dd2fce1e68b6aa953';
export default node;
