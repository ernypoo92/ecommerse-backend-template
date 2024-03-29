const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name',
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })

  .then(catFindAllData => res.json(catFindAllData))

  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ]
  })

  .then(catFindOneData => {
    if (!catFindOneData) {
      res.status(404).json({ message: 'No category matches this id' });
      return;
    }

    res.json(catFindOneData);
  })

  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(catCreationData => res.json(catCreationData))
  .catch(err => {
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(catUpdateData => {
      if (!catUpdateData) {
        res.status(404).json({ message: 'no category matches this id' });
        return;
      }
      res.json(catUpdateData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(catDeleteData => {
    if (!catDeleteData) {
      res.status(404).json({ message: 'no category matches this id' });
      return;
    }
    res.json(catDeleteData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
