/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    readonly artistID: string;
    readonly unfollow?: boolean | null;
    readonly clientMutationId?: string | null;
};
export type ArtistSearchResultsArtistMutationVariables = {
    input: FollowArtistInput;
    excludedArtistIds: ReadonlyArray<string | null>;
};
export type ArtistSearchResultsArtistMutationResponse = {
    readonly followArtist: {
        readonly popular_artists: ReadonlyArray<{
            readonly internalID: string;
            readonly id: string;
            readonly name: string | null;
            readonly image: {
                readonly cropped: {
                    readonly url: string | null;
                } | null;
            } | null;
        } | null> | null;
        readonly artist: {
            readonly id: string;
            readonly related: {
                readonly suggestedConnection: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly internalID: string;
                            readonly id: string;
                            readonly name: string | null;
                            readonly image: {
                                readonly cropped: {
                                    readonly url: string | null;
                                } | null;
                            } | null;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null;
    } | null;
};
export type ArtistSearchResultsArtistMutation = {
    readonly response: ArtistSearchResultsArtistMutationResponse;
    readonly variables: ArtistSearchResultsArtistMutationVariables;
};



/*
mutation ArtistSearchResultsArtistMutation(
  $input: FollowArtistInput!
  $excludedArtistIds: [String]!
) {
  followArtist(input: $input) {
    popular_artists: popularArtists(size: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludedArtistIds) {
      internalID
      id
      name
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
    }
    artist {
      id
      related {
        suggestedConnection(first: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludedArtistIds) {
          edges {
            node {
              internalID
              id
              name
              image {
                cropped(width: 100, height: 100) {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowArtistInput!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "excludedArtistIds",
    "type": "[String]!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "excludeArtistIDs",
  "variableName": "excludedArtistIds"
},
v2 = {
  "kind": "Literal",
  "name": "excludeFollowedArtists",
  "value": true
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "internalID",
    "args": null,
    "storageKey": null
  },
  (v3/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "name",
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
        "kind": "LinkedField",
        "alias": null,
        "name": "cropped",
        "storageKey": "cropped(height:100,width:100)",
        "args": [
          {
            "kind": "Literal",
            "name": "height",
            "value": 100
          },
          {
            "kind": "Literal",
            "name": "width",
            "value": 100
          }
        ],
        "concreteType": "CroppedImageUrl",
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
  }
],
v5 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "followArtist",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "popular_artists",
        "name": "popularArtists",
        "storageKey": null,
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "Literal",
            "name": "size",
            "value": 1
          }
        ],
        "concreteType": "Artist",
        "plural": true,
        "selections": (v4/*: any*/)
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
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "related",
            "storageKey": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "suggestedConnection",
                "storageKey": null,
                "args": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ArtistConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtistEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artist",
                        "plural": false,
                        "selections": (v4/*: any*/)
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistSearchResultsArtistMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistSearchResultsArtistMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v5/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "ArtistSearchResultsArtistMutation",
    "id": null,
    "text": "mutation ArtistSearchResultsArtistMutation(\n  $input: FollowArtistInput!\n  $excludedArtistIds: [String]!\n) {\n  followArtist(input: $input) {\n    popular_artists: popularArtists(size: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludedArtistIds) {\n      internalID\n      id\n      name\n      image {\n        cropped(width: 100, height: 100) {\n          url\n        }\n      }\n    }\n    artist {\n      id\n      related {\n        suggestedConnection(first: 1, excludeFollowedArtists: true, excludeArtistIDs: $excludedArtistIds) {\n          edges {\n            node {\n              internalID\n              id\n              name\n              image {\n                cropped(width: 100, height: 100) {\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '5125c1788a3f6c745f71598546b2c52a';
export default node;
