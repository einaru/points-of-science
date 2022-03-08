import en from "./en";
import nb from "./nb_NO";

describe("Norwegian (nb_NO) translations", () => {
  it("contains translations for all English keys", () => {
    const enKeys = Object.keys(en);
    const nbKeys = Object.keys(nb);
    expect(new Set(nbKeys)).toEqual(new Set(enKeys));
  });
});
