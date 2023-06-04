migrate((db) => {
  const collection = new Collection({
    "id": "2qs9034x8r93f1m",
    "created": "2023-06-02 06:04:40.708Z",
    "updated": "2023-06-02 06:04:40.708Z",
    "name": "images",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6gp7adtf",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [
            "200x0"
          ],
          "protected": false
        }
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2qs9034x8r93f1m");

  return dao.deleteCollection(collection);
})
