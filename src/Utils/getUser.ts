import { get } from "./get"

export function getUser(user: User | null | undefined): User | null {
  let _user = user

  if (_user === undefined) {
    const id = process.env.USER_ID
    const type = process.env.USER_TYPE || "User"
    const accessToken = process.env.USER_ACCESS_TOKEN
    const labFeatures = process.env.USER_LAB_FEATURES

    if (id && accessToken) {
      _user = {
        id,
        accessToken,
        type,
      }

      if (labFeatures) {
        _user.lab_features = labFeatures.split(",")
      }
    }
  }

  return _user
}

export function userHasLabFeature(user: User, featureName: string): boolean {
  const lab_features = get(user, u => u.lab_features, [])

  return lab_features.includes(featureName)
}
