import type { AccordionItem } from "../components/shared/Accordion";

export const recipes: AccordionItem[] = [
  {
    id: 1,
    title: "Spritzlight",
    submenu: {
      heading: "45ml/1,5 oz Aperol 60ml/2oz Principio",
      method:
        "Method. Pour Aperol in a glass, add some ice, stir and add Principio.",
      glass: "Glass. Young white wine glass",
      garnish: "Garnish, Orange peel",
    },
    images: [
      {
        src: "/images/imgi_30_ghiaccio_00.png",
        top: 45,
        left: 3,
        width: 8,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_15_spritzlight_01.png",
        bottom: -20,
        right: 5,
        width: 12,
        parallax: -0.2,
      },
      {
        src: "/images/imgi_16_spritzlight_02.png",
        top: 25,
        right: 33,
        width: 15,
        parallax: 0.12,
      },
      {
        src: "/images/imgi_17_spritzlight_03.png",
        top: 0,
        right: -5,
        width: 13,
        parallax: 0.18,
      },
      {
        src: "/images/imgi_35_ghiaccio_01.png",
        bottom: 25,
        right: 2,
        width: 8,
        parallax: -0.16,
      },
    ],
  },
  {
    id: 2,
    title: "Principio Americano",
    submenu: {
      heading:
        "15ml /0,5oz campari . 15 ml/0,5oz vermouth Cinzano . 60/2oz ml principio",
      method:
        "Pour Campari, Cinzano Vermouth and Principio in a glass, mix ingredients and add ice.",
      glass: "Glass. Low tumbler",
      garnish: "Garnish. Rosemary spring",
    },
    images: [
      {
        src: "/images/imgi_35_ghiaccio_01.png",
        bottom: 10,
        right: 4,
        width: 8,
        parallax: -0.1,
      },
      {
        src: "/images/imgi_18_americano_01.png",
        top: 33,
        right: 35,
        width: 22,
        parallax: -0.15,
      },
      {
        src: "/images/imgi_19_rosmarino_00.png",
        top: 15,
        right: 2,
        width: 10,
        parallax: 0.16,
      },
      {
        src: "/images/imgi_30_ghiaccio_00.png",
        bottom: 25,
        left: 5,
        width: 8,
        parallax: -0.12,
        hiddenMobile: true,
      },
      {
        src: "/images/imgi_26_rosmarino_01.png",
        bottom: 10,
        right: 14,
        width: 8,
        parallax: 0.12,
      },
    ],
  },
  {
    id: 3,
    title: "Bee mexicano",
    submenu: {
      heading:
        "30 ml/1oz spremuta di arancia . 30 ml/1oz tequila reposado . 100ml/3,4oz principio",
      method:
        "Pour orange juice and tequila with ice into a cocktail shaker, shake and pour the drink in a glass, then add Principio.",
      glass: "High Tumbler",
      garnish: "Dried chili pepper",
    },
    images: [
      {
        src: "/images/imgi_20_mexicano_00.png",
        bottom: 20,
        left: -5,
        width: 18,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_35_ghiaccio_01.png",
        bottom: 52,
        right: 4,
        width: 6,
        parallax: -0.07,
      },
      {
        src: "/images/imgi_32_mexicano_02.png",
        top: 0,
        right: 20,
        width: 12,
        parallax: -0.18,
      },
      {
        src: "/images/imgi_30_ghiaccio_00.png",
        top: 15,
        left: 5,
        width: 6,
        parallax: 0.06,
      },
      {
        src: "/images/imgi_21_mexicano_04.png",
        bottom: -10,
        right: 5,
        width: 15,
        parallax: 0.1,
      },
    ],
  },
  {
    id: 4,
    title: "Modern frenchie",
    submenu: {
      heading:
        "20 ml/0,60 oz gin . 10 ml/0,30 oz limone . 105 ml 3,5 principio, one teaspoon and a half of sugar",
      method:
        "Put sugar, lemon and gin in a cocktail shaker, shake and pour the drink in a flut, then add Principio.",
      glass: "Glass Flut",
    },
    images: [
      {
        src: "/images/imgi_34_frenchie_00.png",
        bottom: 16,
        left: -6,
        width: 15,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_31_frenchie_01.png",
        bottom: 24,
        right: -4,
        width: 15,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_30_ghiaccio_00.png",
        top: 15,
        left: 6,
        width: 8,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_22_frenchie_03.png",
        bottom: 0,
        right: 18,
        width: 10,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_23_frenchie_04.png",
        top: -6,
        right: 20,
        width: 11,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_35_ghiaccio_01.png",
        top: 20,
        right: 4,
        width: 7,
        parallax: 0.1,
      },
    ],
  },
  {
    id: 5,
    title: "Mead & tonica",
    submenu: {
      heading: "1/2 principio . 1/2 tonic",
      method:
        "Pour ice in aglass, pour tonic and add Principio, mix as you like.",
      glass: "High tumbler",
      garnish: "Sage leaf / Rosemary spring",
    },
    images: [
      {
        src: "/images/imgi_30_ghiaccio_00.png",
        top: 15,
        left: 2,
        width: 7,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_19_rosmarino_00.png",
        bottom: 2,
        right: 3,
        width: 12,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_24_tonica_02.png",
        top: 0,
        right: 22,
        width: 13,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_25_tonica_03.png",
        bottom: 10,
        left: 8,
        width: 12,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_26_rosmarino_01.png",
        top: 40,
        left: 44,
        width: 9,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_35_ghiaccio_01.png",
        top: 20,
        right: 2,
        width: 6,
        parallax: 0.1,
        hiddenMobile: true,
      },
    ],
  },
  {
    id: 6,
    title: "Red honey",
    submenu: {
      heading: "60 ml/2 oz Principio . 40 ml/1,35oz infuso ai frutti rossi",
      method:
        "Pour ice in a glass, pour infusion and add Principio, mix as you like.",
      glass: "High tumbler",
      garnish: "Dried red fruits",
    },
    images: [
      {
        src: "/images/imgi_27_red_00.png",
        bottom: 28,
        left: 2,
        width: 9,
        parallax: 0.1,
        hiddenMobile: true,
      },
      {
        src: "/images/imgi_28_red_01.png",
        top: 0,
        right: 25,
        width: 11,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_29_red_02.png",
        bottom: 8,
        right: 5,
        width: 11,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_35_ghiaccio_01.png",
        top: 20,
        left: 5,
        width: 7,
        parallax: 0.1,
      },
      {
        src: "/images/imgi_33_red_04.png",
        top: 40,
        right: 42,
        width: 9,
        parallax: 0.1,
      },
    ],
  },
];
