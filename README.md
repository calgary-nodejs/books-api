
# REST API for a books catalog

### To list books collection
```
GET /books
```
Response list of books:
```javascript
[{
  "id": "...",
  "title": "...",
  "authors": [ "..." ],
  "categories": [ "..." ],
  ...
}, ...]
```

### To get books inspired by user views
```
GET /books/inspired
```
Response 0 or more books:
```javascript
[{}, ...]  // array of books objects
```

### To get a book by Id:
```
GET /books/:bookId
```
Response 1 book or 404 if not found:
```javascript
{
  "id": "...",
  "title": "...",
  "authors": [ "..." ],
  ...
}
```

### To get books similar to a given book id:
```
GET /books/:bookId/similar
```
Response 0 or more books:
```javascript
[{}, ...]  // array of books objects
```

### To get books by category:
```
GET /books?category=history
```
Response 0 or more books:
```javascript
[{
  ...book json...
}, ...]
```

# Install
```
yarn install
```

# Run
```
yarn debug
```

# Test Data:
All the data in the example database populated from the `data.json` included in the repo.

# JWTs for users populated in the example database that you can play with:
 - John Admin:
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyYTY0ZGMzLWE4NTYtNGExYS1iN2E1LTdiMGI1OGJlOTBiNyIsIm5hbWUiOiJKb2huIEFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6ImpvaG5Ac29tZW1haWwuY29tIiwic2NvcGUiOiJkZWxldGU6Ym9vayJ9.0svbi5IkZNjTiFFTzxs_p6Ln6h2Y8ScZyTIMMRLuGtY

 - Bob User:
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjZWJjNmI2LTVhODEtNDRkOS1hNDBhLTBiNTE4MGFlMDhkNiIsIm5hbWUiOiJCb2IgVXNlciIsImlhdCI6MTUxNjUzOTAyNSwiZW1haWwiOiJib2JAbWFpbC5jb20ifQ.OnKdMXRMXp4DYRHrD358qT0N3mq92HaZgtMUSkU2DdQ
