/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RelatedArtistsKind = "CONTEMPORARY" | "MAIN" | "%future added value";
export type RelatedArtistsRefetchContainerQueryVariables = {
    readonly first?: number | null;
    readonly last?: number | null;
    readonly after?: string | null;
    readonly before?: string | null;
    readonly artistID: string;
    readonly kind?: RelatedArtistsKind | null;
};
export type RelatedArtistsRefetchContainerQueryResponse = {
    readonly artist: ({}) | null;
};



/*
query RelatedArtistsRefetchContainerQuery(
  $first: Int
  $last: Int
  $after: String
  $before: String
  $artistID: String!
  $kind: RelatedArtistsKind
) {
  artist(id: $artistID) {
    ...RelatedArtistsRefetchContainer_artist_dxT5s
    __id
  }
}

fragment RelatedArtistsRefetchContainer_artist_dxT5s on Artist {
  id
  related {
    artists(first: $first, after: $after, before: $before, last: $last, kind: $kind) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      pageCursors {
        ...RelayPagination_pageCursors
      }
      edges {
        node {
          name
          image {
            cropped(width: 400, height: 300) {
              url
            }
          }
          formatted_nationality_and_birthday
          __id
        }
      }
    }
  }
  __id
}

fragment RelayPagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "kind",
    "type": "RelatedArtistsKind",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID",
    "type": "String!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "cursor",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "page",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "RelatedArtistsRefetchContainerQuery",
  "id": null,
  "text": "query RelatedArtistsRefetchContainerQuery(\n  $first: Int\n  $last: Int\n  $after: String\n  $before: String\n  $artistID: String!\n  $kind: RelatedArtistsKind\n) {\n  artist(id: $artistID) {\n    ...RelatedArtistsRefetchContainer_artist_dxT5s\n    __id\n  }\n}\n\nfragment RelatedArtistsRefetchContainer_artist_dxT5s on Artist {\n  id\n  related {\n    artists(first: $first, after: $after, before: $before, last: $last, kind: $kind) {\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      pageCursors {\n        ...RelayPagination_pageCursors\n      }\n      edges {\n        node {\n          name\n          image {\n            cropped(width: 400, height: 300) {\n              url\n            }\n          }\n          formatted_nationality_and_birthday\n          __id\n        }\n      }\n    }\n  }\n  __id\n}\n\nfragment RelayPagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RelatedArtistsRefetchContainerQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "RelatedArtistsRefetchContainer_artist",
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "after",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "before",
                "variableName": "before",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "first",
                "variableName": "first",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "kind",
                "variableName": "kind",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "last",
                "variableName": "last",
                "type": null
              }
            ]
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RelatedArtistsRefetchContainerQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": v1,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "related",
            "storageKey": null,
            "args": null,
            "concreteType": "RelatedArtists",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artists",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "after",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "before",
                    "variableName": "before",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "first",
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "kind",
                    "variableName": "kind",
                    "type": "RelatedArtistsKind"
                  },
                  {
                    "kind": "Variable",
                    "name": "last",
                    "variableName": "last",
                    "type": "Int"
                  }
                ],
                "concreteType": "ArtistConnection",
                "plural": false,
                "selections": [
                  {
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
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasPreviousPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "startCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageCursors",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursors",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "around",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": true,
                        "selections": v3
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "first",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": v3
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "last",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "plural": false,
                        "selections": v3
                      }
                    ]
                  },
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
                        "selections": [
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
                                "storageKey": "cropped(height:300,width:400)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 300,
                                    "type": "Int!"
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 400,
                                    "type": "Int!"
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
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "formatted_nationality_and_birthday",
                            "args": null,
                            "storageKey": null
                          },
                          v2
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          v2
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'ade51a3cf2f33dbe917e0bf896dceae6';
export default node;
