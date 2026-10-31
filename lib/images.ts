// Sample photography from Unsplash (free licence, https://unsplash.com/license).
// These are SAMPLE images, not Ganpati Colour Lab client work. Replace with the
// studio's own photos (see README) and never present stock as customer projects.

export type GalleryCategory =
  | "Wedding Albums"
  | "Couple Photography"
  | "Traditional Weddings"
  | "Album Designs"
  | "Printed Memories";

export interface Photo {
  id: string;
  alt: string;
  credit: string;
  w: number; // intrinsic aspect hints (portrait/landscape) for masonry
  h: number;
  category: GalleryCategory;
}

const U = (id: string) => `https://images.unsplash.com/${id}`;

export const photoUrl = (id: string, width = 1200, quality = 80) =>
  `${U(id)}?auto=format&fit=crop&w=${width}&q=${quality}`;

export const photos: Photo[] = [
  { id: "photo-1599462616558-2b75fd26a283", alt: "Sample photo: couple in traditional Indian wedding attire", credit: "Mohit Maru", w: 4, h: 5, category: "Traditional Weddings" },
  { id: "photo-1630526720753-aa4e71acf67d", alt: "Sample photo: couple in traditional Indian wedding attire by a river", credit: "Sean Williams", w: 4, h: 5, category: "Traditional Weddings" },
  { id: "photo-1722952934708-749c22eb2e58", alt: "Sample photo: bride and groom posing together", credit: "Arto Suraj", w: 4, h: 5, category: "Wedding Albums" },
  { id: "photo-1621801306185-8c0ccf9c8eb8", alt: "Sample photo: hands with intricate henna patterns", credit: "Love Arya", w: 1, h: 1, category: "Traditional Weddings" },
  { id: "photo-1617376431454-8195cf1fd668", alt: "Sample photo: couple embracing", credit: "Alba Rebecca", w: 4, h: 5, category: "Couple Photography" },
  { id: "photo-1520854221256-17451cc331bf", alt: "Sample photo: couple holding hands", credit: "Jeremy Wong Weddings", w: 5, h: 4, category: "Couple Photography" },
  { id: "photo-1532712938310-34cb3982ef74", alt: "Sample photo: bride and groom walking on a hill", credit: "Foto Pettine", w: 4, h: 5, category: "Wedding Albums" },
  { id: "photo-1573676048035-9c2a72b6a12a", alt: "Sample photo: black and white portrait of newly weds", credit: "Jonathan Borba", w: 4, h: 5, category: "Album Designs" },
  { id: "photo-1537633552985-df8429e8048b", alt: "Sample photo: newly wed couple standing on a shore", credit: "Nathan Dumlao", w: 5, h: 4, category: "Couple Photography" },
  { id: "photo-1604017011826-d3b4c23f8914", alt: "Sample photo: couple kissing in a golden field", credit: "Camila Cordeiro", w: 4, h: 5, category: "Wedding Albums" },
  { id: "photo-1490723186985-6d7672633c86", alt: "Sample photo: man kissing woman's forehead", credit: "Nathan McBride", w: 4, h: 5, category: "Couple Photography" },
  { id: "photo-1591969851586-adbbd4accf81", alt: "Sample photo: silhouette of a couple embracing in golden light", credit: "Jonathan Borba", w: 5, h: 4, category: "Album Designs" },
  { id: "photo-1533158307587-828f0a76ef46", alt: "Sample photo: pile of printed photographs and postcards", credit: "Jon Tyson", w: 5, h: 4, category: "Printed Memories" },
  { id: "photo-1595981234058-a9302fb97229", alt: "Sample photo: printed photographs on a white wooden table", credit: "Rirri", w: 5, h: 4, category: "Printed Memories" },
  { id: "photo-1551225471-e45c367f3b89", alt: "Sample photo: photo collage of prints on a wall", credit: "Juliana Malta", w: 4, h: 5, category: "Printed Memories" },
  { id: "photo-1494621622354-777dad9c18e4", alt: "Sample photo: person holding three printed pictures", credit: "Cole Keister", w: 4, h: 5, category: "Printed Memories" },
];

export const byId = (id: string) => photos.find((p) => p.id === id)!;

export const hero = photos[0];
export const albumPhotos = [photos[2], photos[6], photos[9], photos[4], photos[7], photos[5], photos[8], photos[11]];

export const categories: GalleryCategory[] = [
  "Wedding Albums",
  "Couple Photography",
  "Traditional Weddings",
  "Album Designs",
  "Printed Memories",
];
