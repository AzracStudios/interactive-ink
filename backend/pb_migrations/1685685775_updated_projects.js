migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gi1o8o0kmwj5csl")

  // remove
  collection.schema.removeField("9u8gnkvc")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gi1o8o0kmwj5csl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9u8gnkvc",
    "name": "images",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
