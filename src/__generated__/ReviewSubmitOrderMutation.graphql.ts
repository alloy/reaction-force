/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type SubmitOrderInput = {
    readonly orderId: string;
    readonly clientMutationId?: string | null;
};
export type ReviewSubmitOrderMutationVariables = {
    readonly input: SubmitOrderInput;
};
export type ReviewSubmitOrderMutationResponse = {
    readonly ecommerceSubmitOrder: {
        readonly orderOrError: ({
            readonly order?: {
                readonly state: string | null;
            } | null;
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } & ({
            readonly order: {
                readonly state: string | null;
            } | null;
        } | {
            readonly error: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | null;
        } | {
            /*This will never be '% other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        })) | null;
    } | null;
};
export type ReviewSubmitOrderMutation = {
    readonly response: ReviewSubmitOrderMutationResponse;
    readonly variables: ReviewSubmitOrderMutationVariables;
};



/*
mutation ReviewSubmitOrderMutation(
  $input: SubmitOrderInput!
) {
  ecommerceSubmitOrder(input: $input) {
    orderOrError {
      __typename
      ... on OrderWithMutationSuccess {
        order {
          __typename
          state
          id
        }
      }
      ... on OrderWithMutationFailure {
        error {
          type
          code
          data
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
    "type": "SubmitOrderInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "type": "OrderWithMutationFailure",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "error",
      "storageKey": null,
      "args": null,
      "concreteType": "EcommerceError",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "type",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "code",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "data",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ReviewSubmitOrderMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSubmitOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmitOrderPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ReviewSubmitOrderMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "ecommerceSubmitOrder",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "SubmitOrderPayload",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "orderOrError",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "OrderWithMutationSuccess",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "order",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "ReviewSubmitOrderMutation",
    "id": null,
    "text": "mutation ReviewSubmitOrderMutation(\n  $input: SubmitOrderInput!\n) {\n  ecommerceSubmitOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderWithMutationSuccess {\n        order {\n          __typename\n          state\n          id\n        }\n      }\n      ... on OrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'd8b9bdee6af75e80c6c0014bf9882b41';
export default node;
