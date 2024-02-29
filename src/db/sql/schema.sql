CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    artistName TEXT NOT NULL,
    duration TEXT NOT NULL,
    isrc TEXT NULL,
    releaseDate TEXT NOT NULL
 );
