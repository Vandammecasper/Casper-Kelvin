## Services

### Create

```js
mutation {
  createService(createServiceInput: { name: "Clean Shave", description: "a full clean cut and shave", price:30, duration:30, utilities:["schaar", "borstel", "scheermems"] }) {
    id
    name
    description
    duration
    price
    utilities
  }
}
```

### Update

```js
mutation {
  updateService(updateServiceInput: {id:"651abb38e8b98bc63058f644", name: "Clean Shave", description: "a full clean cut and shave", price:25, duration:30, utilities:["schaar", "borstel", "scheermems"] }) {
    id
    name
    description
    duration
    price
    utilities
  }
}
```
