/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { GeneSearchResults_viewer$ref } from "./GeneSearchResults_viewer.graphql";
export type GeneSearchResultsQueryVariables = {
    readonly term: string;
};
export type GeneSearchResultsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": GeneSearchResults_viewer$ref;
    } | null;
};
export type GeneSearchResultsQuery = {
    readonly response: GeneSearchResultsQueryResponse;
    readonly variables: GeneSearchResultsQueryVariables;
};



/*
query GeneSearchResultsQuery(
  $term: String!
) {
  viewer {
    ...GeneSearchResults_viewer
  }
}

fragment GeneSearchResults_viewer on Viewer {
  match_gene(term: $term) {
    name
    id
    _id
    image {
      cropped(width: 100, height: 100) {
        url
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
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
    "name": "GeneSearchResultsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "GeneSearchResults_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GeneSearchResultsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "match_gene",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term"
              }
            ],
            "concreteType": "Gene",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "_id",
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
                  },
                  (v1/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GeneSearchResultsQuery",
    "id": null,
    "text": "query GeneSearchResultsQuery(\n  $term: String!\n) {\n  viewer {\n    ...GeneSearchResults_viewer\n  }\n}\n\nfragment GeneSearchResults_viewer on Viewer {\n  match_gene(term: $term) {\n    name\n    id\n    _id\n    image {\n      cropped(width: 100, height: 100) {\n        url\n      }\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '381a05e7887812030ff90a5d9f1cf08b';
export default node;
