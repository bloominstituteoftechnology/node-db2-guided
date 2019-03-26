Systems are normally built in Layers

Client <> API < (query builder <> adapter) > data store.

in JS we think like this { id, name, isActive }

relational dbs think like this [ id, name, is_active ]

we need to translate between Objects and Relations

we could use an ORM (Object Relational Mapper)

most ORMs include a Query Builder

a QB translates between a language (JS) and SQL statements

result = {
...project props
actions: [ ...actionsHere]
}

The relational model thinks in SETS
