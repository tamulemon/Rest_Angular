This is a revisit of the REST API, adding angular front end to it

- models: Cat, Dog

- cat routes will start as localhost:8080/cat
- dog routes : localhost:8080/dog

each has the following routes. here I use cat_router as an example:

— Implemented in AngularJS

- api/cats get: view all cats 

- api/cats post: add a new cat 

- api/cats/:catId put: to update a cat by id. User $set method so not overwriting existing infor. upsert set to true 

- api/cats/:catId delete: to delete a cat by id
///////////////////////////////////////////////////////////////////

— Not implemented in AngularJS

- api/cats/:catId/addfriend put: add a cat friend. pass a new cat object in the request body. use $push to push a cat object to friends array as embeded document. 

- api/cats/:catId/addenemy put: pass a dog's id in the request.body. add an enemy from dogs collection. Save the objectID to the enemies array as embeded document

Dog routes is not implemented with friend/enemy yet.