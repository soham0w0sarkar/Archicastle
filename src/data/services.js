export const servicesList = [
  {
    slug: "bim",
    label: "BIM",
    title: "BIM",
    paragraphs: [
      "An Information rich model is enough to speak about the project.",
      "Archicastle has a team of experienced BIM modellers in all the disciplines in Architectural, Structural and MEP. We devolped a habit of producing accurate models out of both CAD and Point cloud data.",
      "Since the evolution of the method of designing changed in the AEC industry, modelling helped better visualization and presentation to owners and stakeholders.",
    ],
  },
  {
    slug: "drafting",
    label: "DRAFTING",
    title: "Drafting",
    paragraphs: [
      "Adding details to each and every element of the building ensures better communication between a design and its construction.",
      "Archicastle understand the construction process and deliver quality drafted details and drawings which further helps in the execution on site.",
    ],
  },
  {
    slug: "documentation",
    label: "DOCUMENTATION",
    title: "Documentation",
    paragraphs: [
      "Our expertise includes well coordinated schematic and construction drawings. Our focus is high end accuracy and coordination between all the drawings.",
      "Archicastle has a team of experienced architects having intensive knowledge in Design as well as site execution which is important for producing such construction documents.",
    ],
  },
];

export function getServiceBySlug(slug) {
  return servicesList.find((s) => s.slug === slug);
}

export function getEnquiryMessage(serviceName) {
  return `I would like to enquire about your ${serviceName} services.\n\nPlease contact me with more information.`;
}
