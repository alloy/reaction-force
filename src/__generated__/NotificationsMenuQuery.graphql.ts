/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type NotificationsMenuQueryVariables = {};
export type NotificationsMenuQueryResponse = {
    readonly me: {
        readonly followsAndSaves: {
            readonly notifications: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly href: string | null;
                        readonly summary: string | null;
                        readonly artists: string | null;
                        readonly published_at: string | null;
                        readonly image: {
                            readonly resized: {
                                readonly url: string | null;
                            } | null;
                        } | null;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type NotificationsMenuQuery = {
    readonly response: NotificationsMenuQueryResponse;
    readonly variables: NotificationsMenuQueryVariables;
};



/*
query NotificationsMenuQuery {
  me {
    followsAndSaves {
      notifications: bundledArtworksByArtist(sort: PUBLISHED_AT_DESC, first: 10) {
        edges {
          node {
            href
            summary
            artists
            published_at(format: "MMM DD")
            image {
              resized(height: 40, width: 40) {
                url
              }
              id
            }
            __typename
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "summary",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "artists",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "published_at",
  "args": [
    {
      "kind": "Literal",
      "name": "format",
      "value": "MMM DD"
    }
  ],
  "storageKey": "published_at(format:\"MMM DD\")"
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "resized",
  "storageKey": "resized(height:40,width:40)",
  "args": [
    {
      "kind": "Literal",
      "name": "height",
      "value": 40
    },
    {
      "kind": "Literal",
      "name": "width",
      "value": 40
    }
  ],
  "concreteType": "ResizedImageUrl",
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
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "endCursor",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasNextPage",
      "args": null,
      "storageKey": null
    }
  ]
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  (v0/*: any*/)
],
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "NotificationsMenuQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "followsAndSaves",
            "storageKey": null,
            "args": null,
            "concreteType": "FollowsAndSaves",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "notifications",
                "name": "__WorksForYou_notifications_connection",
                "storageKey": "__WorksForYou_notifications_connection(sort:\"PUBLISHED_AT_DESC\")",
                "args": [
                  (v0/*: any*/)
                ],
                "concreteType": "FollowedArtistsArtworksGroupConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FollowedArtistsArtworksGroupEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroup",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/)
                            ]
                          },
                          (v6/*: any*/)
                        ]
                      },
                      (v7/*: any*/)
                    ]
                  },
                  (v8/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "NotificationsMenuQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "followsAndSaves",
            "storageKey": null,
            "args": null,
            "concreteType": "FollowsAndSaves",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "notifications",
                "name": "bundledArtworksByArtist",
                "storageKey": "bundledArtworksByArtist(first:10,sort:\"PUBLISHED_AT_DESC\")",
                "args": (v9/*: any*/),
                "concreteType": "FollowedArtistsArtworksGroupConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FollowedArtistsArtworksGroupEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroup",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v10/*: any*/)
                            ]
                          },
                          (v6/*: any*/)
                        ]
                      },
                      (v7/*: any*/)
                    ]
                  },
                  (v8/*: any*/)
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": "notifications",
                "name": "bundledArtworksByArtist",
                "args": (v9/*: any*/),
                "handle": "connection",
                "key": "WorksForYou_notifications",
                "filters": [
                  "sort"
                ]
              }
            ]
          },
          (v10/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "NotificationsMenuQuery",
    "id": null,
    "text": "query NotificationsMenuQuery {\n  me {\n    followsAndSaves {\n      notifications: bundledArtworksByArtist(sort: PUBLISHED_AT_DESC, first: 10) {\n        edges {\n          node {\n            href\n            summary\n            artists\n            published_at(format: \"MMM DD\")\n            image {\n              resized(height: 40, width: 40) {\n                url\n              }\n              id\n            }\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "me",
            "followsAndSaves",
            "notifications"
          ]
        }
      ]
    }
  }
};
})();
(node as any).hash = '7d7328bde406bc85565f0fd69969f3ea';
export default node;
