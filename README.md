# Library API
API for a Library Management -  Api for handling borrowing and returning books to the library

# Endpoints

Main endpoint of the api is 
<server>/api/v1/

## Genres
- List all Genres
    - GET /genre/
- Create a new Genre
    - POST /genre/
    ```
    {
    "name": "genre name",
    "description": "genre description"
    }
    ```
- Get a Genre
    - GET /genre/< id >/
- Update a Genre
    - PATCH /genre/< id >/
- Delete a Genre
    - DELETE /genre/< id >/

## Authors
- List all Authors
    - GET /author/
    It returns the total count of authors but no more than 100 authors per page.

- Paginated List of Authors
    - GET /author/?page=< page >&limit=< limit
    - page: page number
    - limit: number of books per page


- Create a new Author
    - POST /author/
    ```
    {
       "name": "author name"
    }
    ```
- Get a Author
    - GET /author/< id >/
- Update a Author
    - PATCH /author/< id >/
- Delete a Author
    - DELETE /author/< id >/

## Books
- List all Books
    - GET /book/
    It returns the total count of books but no more than 100 books per page.

- Paginated List of Books
    - GET /book/?page=< page >&limit=< limit
    - page: page number
    - limit: number of books per page

- Create a new Book
    - POST /book/
    ```
    {
        "title": "book title",
        "description": "book description",
        "author": "author id",
        "genre": "genre id"
        "image": "book image url"
    }
    ```
- Get a Book
    - GET /book/< id >/
- Update a Book
    - PATCH /book/< id >/
- Delete a Book
    - DELETE /book/< id >/

## Users
- Sign up
    - POST /users/signup/
    ```
    {
        "username": "username",
        "password": "password"
    }
    ```
- Login
    - POST /users/login/
    ```
    {
        "username": "username",
        "password": "password"
    }
    ```

## Dataset
It starts with a dataset of over 300k books, 100k authors and 32 genres. The dataset is available in the dataset folder. To load the dataset into the database, run the following function:
```
fullDB();
```
