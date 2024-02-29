export type Response = {
  name: string,
  duration_ms: string,
  isrc: string,
  artists: {
    name: string
  }[],
  album: {
    release_date: string
  }
}
