export type Artist = {
    images: ImageObject[];
    name: string;
    url: string;
}

export type Track = {
    album: Album;
    external_urls: ExternalURL;
    artists: Artist[];
}

export type Album = {
    external_urls: ExternalURL;
    name: string;
    images: ImageObject[];
}

export type ExternalURL = {
    spotify: string;
}

export type ImageObject = {
    url: string;
}

export type Entry = {
    name: string;
    external_urls: ExternalURL;
    
    // Track
    album: Album;
    artists: Artist[];
    duration_ms: number;

    // Album
    genres: string[];
    images: ImageObject[];
}

export type TrackEntryProps = {
    album: Album;
    artists: Artist[];
    duration_ms: number;
    external_urls: ExternalURL;
    name: string;
}

export type ArtistEntryProps = {
    genres: string[];
    images: ImageObject[];
    name: string;
    external_urls: ExternalURL;
}