// Official Simon Marais Mathematics Competition problem-paper sources.
// These URLs point to the organiser's public PDFs. Historical problem text is not duplicated here.

export const SMMC_PAPER_SOURCES = Object.freeze({
  "2017-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2017-paper-1_1.pdf",
  "2017-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2017-paper-2_1.pdf",
  "2018-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2018-paper-a_1.pdf",
  "2018-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2018-paper-b_1.pdf",
  "2019-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2019-paper-a_1.pdf",
  "2019-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2019-paper-b_1.pdf",
  "2020-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2020-paper-a_1.pdf",
  "2020-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2020-paper-b_1.pdf",
  "2021-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2021-paper-a.pdf",
  "2021-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2021-paper-b.pdf",
  "2022-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2022-paper-a.pdf",
  "2022-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2022-paper-b.pdf",
  "2022-C": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc-2022-paper-c.pdf",
  "2023-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2023_paper_a.pdf",
  "2023-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2023_paper_b.pdf",
  "2023-C": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2023_paper_c.pdf",
  "2024-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2024_paper_a.pdf",
  "2024-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2024_paper_b.pdf",
  "2024-C": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2024_paper_c.pdf",
  "2025-A": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2025_paper_a.pdf",
  "2025-B": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2025_paper_b.pdf",
  "2025-C": "https://www.simonmarais.org/uploads/8/2/3/5/82358688/smmc2025_paper_c.pdf",
});

export function officialPaperUrl(problem) {
  const base = SMMC_PAPER_SOURCES[`${problem.year}-${problem.session}`];
  return base ? `${base}#page=2` : null;
}
