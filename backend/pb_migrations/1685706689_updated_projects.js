migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gi1o8o0kmwj5csl")

  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gi1o8o0kmwj5csl")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
