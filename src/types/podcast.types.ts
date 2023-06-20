export interface Feed {
  author: Author;
  entry: Entry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  icon: Icon;
  link: Link[];
  id: Icon;
}

export interface Author {
  name: Icon;
  uri: Icon;
}

export interface Icon {
  label: string;
}

export interface Entry {
  'im:name': Icon;
  'im:image': IMImage[];
  summary: Icon;
  'im:price': IMPrice;
  'im:contentType': IMContentType;
  rights?: Icon;
  title: Icon;
  link: Link;
  id: ID;
  'im:artist': IMArtist;
  category: Category;
  'im:releaseDate': IMReleaseDate;
}

export interface ICurrentPodcast {
  id: number;
  title: string;
  heightImg: number;
  srcImg: string;
  author: string;
  description: string;
}

export interface Category {
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  'im:id': string;
  term: PurpleLabel;
  scheme: string;
  label: PurpleLabel;
}

export enum PurpleLabel {
  Music = 'Music',
  MusicCommentary = 'Music Commentary',
  MusicHistory = 'Music History',
  MusicInterviews = 'Music Interviews',
}

export interface ID {
  label: string;
  attributes: IDAttributes;
}

export interface IDAttributes {
  'im:id': string;
}

export interface IMArtist {
  label: string;
  attributes?: IMArtistAttributes;
}

export interface IMArtistAttributes {
  href: string;
}

export interface IMContentType {
  attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
  term: FluffyLabel;
  label: FluffyLabel;
}

export enum FluffyLabel {
  Podcast = 'Podcast',
}

export interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

export interface IMImageAttributes {
  height: string;
}

export interface IMPrice {
  label: IMPriceLabel;
  attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
  amount: string;
  currency: Currency;
}

export enum Currency {
  Usd = 'USD',
}

export enum IMPriceLabel {
  Get = 'Get',
}

export interface IMReleaseDate {
  label: Date;
  attributes: Icon;
}

export interface Link {
  attributes: LinkAttributes;
}

export interface LinkAttributes {
  rel: Rel;
  type?: Type;
  href: string;
}

export enum Rel {
  Alternate = 'alternate',
  Self = 'self',
}

export enum Type {
  TextHTML = 'text/html',
}

export interface IPodcastResult {
  resultCount: number;
  results: Result[];
}

export interface Genre {
  name: string;
  id: string;
}

export interface Result {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface Episode {
  collectionViewUrl: string;
  trackTimeMillis: number;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  artistIds: number[];
  artworkUrl60: string;
  artistViewUrl: string;
  contentAdvisoryRating: string;
  trackViewUrl: string;
  artworkUrl600: string;
  description: string;
  shortDescription: string;
  feedUrl: string;
  trackId: number;
  trackName: string;
  releaseDate: Date;
  previewUrl: string;
  episodeUrl: string;
  episodeFileExtension: string;
  episodeContentType: string;
  artworkUrl160: string;
  kind: string;
  wrapperType: string;
  country: string;
  genres: Genre[];
  episodeGuid: string;
}

export interface Genre {
  name: string;
  id: string;
}
