import {
  UpdateAppSecondFactorInput,
  UpdateAppSecondFactorMutation,
  UpdateAppSecondFactorMutationResponse,
} from "__generated__/UpdateAppSecondFactorMutation.graphql"
import { commitMutation, Environment, graphql } from "react-relay"

export const UpdateAppSecondFactor = (
  environment: Environment,
  input: UpdateAppSecondFactorInput
) => {
  return new Promise<UpdateAppSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<UpdateAppSecondFactorMutation>(environment, {
        onCompleted: data => {
          const response = data.updateAppSecondFactor.secondFactorOrErrors

          switch (response.__typename) {
            case "AppSecondFactor":
              resolve(data)
              break
            case "Errors":
              reject(response.errors)
              break
          }
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation UpdateAppSecondFactorMutation(
            $input: UpdateAppSecondFactorInput!
          ) @raw_response_type {
            updateAppSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on AppSecondFactor {
                  __typename
                }

                ... on Errors {
                  __typename
                  errors {
                    message
                    code
                  }
                }
              }
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}
