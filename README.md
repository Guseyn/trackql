# trackql
GraphQL Service in Node.js for Arc Cloud with SQLite database.

# Run In Dev Mode

`npm run dev`

# Build App

`npm run build`

# Start App

`npm start`

# Linter

`npm run lint`

# Integration Tests

`npm run test`

# Recreate DB Schema
 
`npm run db:recreate`

# Queries

For all queries you must use `Authorization` header with your arc cloud token.

## All Tracks

```graphql
query Query {
  allTracks {
    id
    name
    artistName
    duration
    releaseDate
    isrc
  }
}
```

## Track By Id

```graphql
query Query {
  track(id: 4) {
    id
    name
    artistName
    duration
    releaseDate
    isrc
  }
}
```

# Mutations

## Create if Missing and Get Track

```graphql
mutation CreateAndGet {
  createIfMissingAndGetTrackByNameAndArtistName(
  name: "Donna Diaspora", artistName: "Shantel"
) {
    id
    name
    artistName
    duration
    releaseDate
    isrc
  }
}
```

## Update Track

```graphql
mutation UpdateTrackById {
  updateTrackById(id: 1, name: "Donna", artistName: "Shantel") {
    status
  }
}
```

## Delete Track

```graphql
mutation DeleteTrackById {
  deleteTrackById(id: 1) {
    status
  }
}
```
