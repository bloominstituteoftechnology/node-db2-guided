const router = require('express').Router();

router.get('/', async (req, res) => {
  // get the roles from the database
  res.send('Write code to retrieve all roles');
  try {
    const roles = await db('roles');
  } catch (error) {

  }
  const roles = await db('roles');
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  res.send('Write code to retrieve a role by id');
});

router.post('/', (req, res) => {
  // add a role to the database
  res.send('Write code to add a role');
});

router.put('/:id', (req, res) => {
  // update roles
  res.send('Write code to modify a role');
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});

module.exports = router;
