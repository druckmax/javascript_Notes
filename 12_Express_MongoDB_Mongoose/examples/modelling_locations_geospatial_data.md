# Modelling locations / Geospatial data

In this example we will embed location data into the tour model. MongoDb supports gespatial data out of the box. Geospatial data is data which describes a place's coordinates using latitude and longitude. This helps us to describe simple location points, but also complex geometries like lines or polygons.

When working with geospatial data, mongoDB uss a special data format called GeoJSON. This means that when defining an object, this object no longer refers to the schema's options, but is really just an embedded object. In order for this object to be recoginzed as GeoJSON, we need two properties, namely type and coordinates. Inside this object we can now define our schema options for our fields.

```js
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
```
