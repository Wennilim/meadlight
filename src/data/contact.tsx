import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./icon";

export const contactData = [
  {
    id: 1,
    title: "Let's get to know each other",
    highlight: "each other",
    content: `You can call, write or contact us on social media. We will be delighted to meet you!`,
  },
];

export const places = [
  {
    region: "Lombardy",
    locations: [
      {
        name: "Milan . The Botanical Club .",
        address: "Via Pastrengo 11 . MI",
        href: "https://goo.gl/maps/wjuW9UgeFS2pUNfx5n",
      },
      {
        name: "Milan . Lacerba",
        address: "Via Orti 4 . MI",
        href: "https://goo.gl/maps/DXScStizsNcee7TN9",
      },
    ],
  },
  {
    region: "Piedmont",
    locations: [
      {
        name: "Turin . EDIT .",
        address: "Piazza Teresa Noce 15/A . TO",
        href: "https://g.page/EDIT-Torino-ATasteForSharing?share",
      },
      {
        name: "Turin . Affini .",
        address: "Via Belfiore 16 . TO",
        href: "https://goo.gl/maps/kgXMRzyHPfttqefH7",
      },
      {
        name: "Biella . 13900 Cocktail Bar .",
        address: "Via Eugenio Bona 3 . BI",
        href: "https://goo.gl/maps/gU7dxMgYC4NhToXn6",
      },
      {
        name: "Borgomanero . Mood Cafe .",
        address: "Corso Garibaldi 18/20 . Novara . NO",
        href: "https://goo.gl/maps/A5nfU4ZPUa2BcLtj6",
      },
    ],
  },
];

export const socials = [
  {
    label: "Instagram",
    href: "http://instagram.com/meadlightdrinks",
    icon: <InstagramIcon />,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/meadlightdrinks/",
    icon: <FacebookIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/meadlight/about/",
    icon: <LinkedInIcon />,
  },
];
