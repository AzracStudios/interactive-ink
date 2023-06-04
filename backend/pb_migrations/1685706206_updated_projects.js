migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gi1o8o0kmwj5csl")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gi1o8o0kmwj5csl")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
