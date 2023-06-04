migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qs9034x8r93f1m")

  // remove
  collection.schema.removeField("navhpbdb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qs9034x8r93f1m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "navhpbdb",
    "name": "alt",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
