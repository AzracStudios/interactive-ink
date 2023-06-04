migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qs9034x8r93f1m")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2qs9034x8r93f1m")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
