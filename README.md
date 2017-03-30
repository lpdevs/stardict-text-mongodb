### stardict-text-mongodb

  * Stardict databases using mongoDB with mongoose.
  * Assumming that the name of your database is 'stardict_db'
  * Open cmd (1), run:

    ```
    mongo
    use stardict_db
    ```

  * To build English-Vietnamese dictionary:

    * Open cmd (2) in the project location, then run:

      ```
      node index.js stardict_en_vi.txt stardict_db en_vi
      ```

      * stardict_en_vi.txt : input file
      * stardict_db : name of your database
      * en_vi : name of the collection.

  * To build English-Vietnamese dictionary:

    * Open cmd (2) in the project location, then run:

      ```
      node index.js stardict_vi_en.txt stardict_db vi_en
      ```

      * stardict_vi_en.txt : input file
      * stardict_db : name of your database
      * vi_en : name of the collection.

  * To build other dictionaries, just do the same things.

### Document Modeling

  ```js
  mongoose.connect('mongodb://localhost/' + dbName);
  var wordSchema = mongoose.Schema({
    index: Number,
    key: String,
    descriptions : String
  });
  var Word = mongoose.model(coName, wordSchema);
  ```

    * dbName: name of database
    * coName: name of collection

### Model Names for Mongoose

  * stardict_en_vi : en_vi
  * stardict_vi_en : vi_en

### All scripts to build all dictionaries

  * node index.js stardict_en_vi.txt stardict_db en_vi
  * node index.js stardict_vi_en.txt stardict_db vi_en

### TO DO

  * Update current dictionaries
  * Add more dictionaries
