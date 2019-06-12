/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
declare const _ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref: unique symbol;
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref = typeof _ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref;
export type ArtworkDetailsAboutTheWorkFromArtsy_artwork = {
    readonly description: string | null;
    readonly " $refType": ArtworkDetailsAboutTheWorkFromArtsy_artwork$ref;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkDetailsAboutTheWorkFromArtsy_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "storageKey": "description(format:\"HTML\")"
    }
  ]
};
(node as any).hash = '621e4eaa61c267369ccc26d7d14d9ef3';
export default node;
