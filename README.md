# Library API
API for a Library Management -  Api for handling borrowing and returning books to the library

# Endpoint

Main endpoint of the api is 
<server>/api/v1/

## Genres
- List all Genres
    - GET /genres/
- Create a new Genre
    - POST /genres/
    ```
    {
    "name": "genre name"
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
    - GET /books/
- Create a new Book
    - POST /books/
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
    - GET /books/< id >/
- Update a Book
    - PATCH /books/< id >/
- Delete a Book
    - DELETE /books/< id >/

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
