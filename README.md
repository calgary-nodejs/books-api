
REST API for a books catalog

To list books collection
```
GET /books
```
Response list of books:
```javascript
[{
  "id": "...",
  "title": "...",
  "authors": [ "..." ],
  ...
}, ...]
```

To get a book by Id:
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

To get books by category:
```
GET /books?category=history
```
Response 0 or more books:
```javascript
[{
  ...book json...
}, ...]
```
