import { SMMC_OFFICIAL_SOLUTION_SOURCES_V1 } from "../official-solution-sources-v1.mjs";
import { SMMC_PAPER_SOURCES } from "../sources-v1.mjs";

// Machine-readable canonical source registry for Gate 1+ evidence validation.
//
// This freezes source identity only. It does not freeze candidate ontology.
// Every SOURCE_FACT record must point to exactly one source in this registry.

const book = (sourceId, title, pages, sha256) => Object.freeze({
  sourceId,
  kind: "BOOK_PDF",
  title,
  pages,
  sha256,
});

const paper = (paperKey, sha256) => Object.freeze({
  sourceId: `S0-SMMC-PAPER-${paperKey}`,
  kind: "OFFICIAL_SMMC_PAPER",
  paperKey,
  url: SMMC_PAPER_SOURCES[paperKey],
  pages: 2,
  sha256,
});

const solution = source => Object.freeze({
  sourceId: source.sourceId,
  kind: "OFFICIAL_SMMC_SOLUTION",
  yearPage: source.yearPage,
  url: source.url,
  pages: source.pages,
  sha256: source.sha256,
  label: source.label,
});

export const ARSENAL_CANONICAL_SOURCES_V1 = Object.freeze({
  "S1-ZEITZ-2007-2E": book(
    "S1-ZEITZ-2007-2E",
    "Paul Zeitz — The Art and Craft of Problem Solving, 2nd ed.",
    383,
    "be9d5f2bd96e3010fc30b3d9dee191a787ad4624fffe20aa28cf7a3e73382565"
  ),
  "S2-ENGEL-1998": book(
    "S2-ENGEL-1998",
    "Arthur Engel — Problem-Solving Strategies",
    401,
    "abc16cf21b4389bc357246140c88422a387aceb741c539de5f5da27f954cc096"
  ),
  "S3-HAMMACK-BOOK-OF-PROOF-3.4": book(
    "S3-HAMMACK-BOOK-OF-PROOF-3.4",
    "Richard Hammack — Book of Proof, Edition 3.4",
    380,
    "e0e471ca794ddda7bc46704b22885e1582350b7fc5881f8ba9a61b3747ec79fd"
  ),
  "S4-VELLEMAN-2006-2E": book(
    "S4-VELLEMAN-2006-2E",
    "Daniel J. Velleman — How To Prove It, 2nd ed.",
    398,
    "eca0a0a955668e721df2f2e2aaf0d1e31044844a8c6e1435541c5531c863c142"
  ),
  "S5-GELCA-ANDREESCU-2007": book(
    "S5-GELCA-ANDREESCU-2007",
    "Razvan Gelca and Titu Andreescu — Putnam and Beyond",
    807,
    "143c74f8267984e34a6f260d1e20c51cd63e7e73c499161f85c4981e0f620fba"
  ),

  "S0-SMMC-PAPER-2017-A": paper("2017-A", "fdf68537cf26fefc63899d1781c1a968ce6ab2edd8565ddaa17fbf1b74532068"),
  "S0-SMMC-PAPER-2017-B": paper("2017-B", "69d7cf84128c2464d962136ed613808b6c7a7b07122cfba9c06b5adf775e2a68"),
  "S0-SMMC-PAPER-2018-A": paper("2018-A", "adaf22a5a19fbb1ca996e7ea28f968950e4f4aa30e889e1ba002306fb8fbe3e8"),
  "S0-SMMC-PAPER-2018-B": paper("2018-B", "fa26d31d056dfcb5f782209c20ee0c59f20717cdc48ef195c2099582037aa704"),
  "S0-SMMC-PAPER-2019-A": paper("2019-A", "b23b32b4a092aff314537b1d6e3fb445674301dc640be6e6105418e273100e1c"),
  "S0-SMMC-PAPER-2019-B": paper("2019-B", "5d7dbea3566e5b34bd84fa517ba2c5bf0258459db3a980988008490169be46bb"),
  "S0-SMMC-PAPER-2020-A": paper("2020-A", "4e024dc5627c49fd7c4717ee2993bc0b03c9414685ea216c482ec7f759de20b8"),
  "S0-SMMC-PAPER-2020-B": paper("2020-B", "87d99c8f1c3d077bddeb542e3825a515e90b0f29339acde94758d57a102bb3da"),
  "S0-SMMC-PAPER-2021-A": paper("2021-A", "9ebb37bd839738da774c8a10c6c2c18eda3d45ddb9e8acdfc7c13611c3aaac35"),
  "S0-SMMC-PAPER-2021-B": paper("2021-B", "2d507d593500f762e90b041d03a451e884ea33c8769f9a2132427e14d8f926d1"),
  "S0-SMMC-PAPER-2022-A": paper("2022-A", "ade30b04de4e1174e7dca2378e196fbe0082168fb65fb6e2e3c829338dede27e"),
  "S0-SMMC-PAPER-2022-B": paper("2022-B", "33b15241e89b2e4db54f78d3a565ee01afe357ade786f8bb7602c0b7e89e4519"),
  "S0-SMMC-PAPER-2022-C": paper("2022-C", "ff796a19ee636a58a09249e337a6dff9d45fb96919ba74175f5c515de943096a"),
  "S0-SMMC-PAPER-2023-A": paper("2023-A", "461dabfbf152d98358b0fd7bbdf6907c5ef795292a72942e64139ba4d33cf4f6"),
  "S0-SMMC-PAPER-2023-B": paper("2023-B", "7d8ec51774224eeb1d66c1bae5ba6df98c0f7b41b0635811105a669be7a6eee2"),
  "S0-SMMC-PAPER-2023-C": paper("2023-C", "62d00c498442bacc673d5a272d079542bc1029649726e0a48c8eb98a81bedfaf"),
  "S0-SMMC-PAPER-2024-A": paper("2024-A", "67805879ee236dfdf3d587504c328d7a98272b25a01299e371bb6f2178290d4f"),
  "S0-SMMC-PAPER-2024-B": paper("2024-B", "1401f21218ad4c387c4d537ed8fd7de119b376cba52957ef788c772dc5ab4ddc"),
  "S0-SMMC-PAPER-2024-C": paper("2024-C", "195d8a0c0269fe0908536b68f4eafd963b976c0cb8e2182d8f176bf61e9ce443"),
  "S0-SMMC-PAPER-2025-A": paper("2025-A", "6801affcdfefe816269e6731b53ff0794ba61b57fe949712f50454c88c8939a2"),
  "S0-SMMC-PAPER-2025-B": paper("2025-B", "c6d1d0c47c84521da836e766201224c84cae7c481449f28c72df842caa8e2893"),
  "S0-SMMC-PAPER-2025-C": paper("2025-C", "9f0bbeac938b46ba9a55e0f58aad3b17b7dd7af905dd128012a0821292ffa708"),

  ...Object.fromEntries(
    Object.values(SMMC_OFFICIAL_SOLUTION_SOURCES_V1).map(source => [
      source.sourceId,
      solution(source),
    ])
  ),
});

export function canonicalArsenalSource(sourceId) {
  return ARSENAL_CANONICAL_SOURCES_V1[sourceId] || null;
}

export function isOfficialSmmcCanonicalSource(sourceId) {
  const source = canonicalArsenalSource(sourceId);
  return Boolean(
    source &&
    (source.kind === "OFFICIAL_SMMC_PAPER" || source.kind === "OFFICIAL_SMMC_SOLUTION")
  );
}
