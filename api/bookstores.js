import express from 'express';
import prisma from './lib/index.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const bookstore = await prisma.bookStore.findMany();
    if (bookstore.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: 'bookstore not found' });
    }

    res.json(bookstore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bookstore = await prisma.bookStore.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!bookstore) {
      return res.status(404).json({ error: 'bookstore not found' });
    }
    res.json(bookstore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { bookId, name, location } = req.body;

    const bookstore = await prisma.bookStore.create({
      data: {
        bookId,
        name,
        location,
      },
    });

    if (!bookstore) {
      return res
        .status(400)
        .json({ status: 400, message: 'bookstore was not created!' });
    }

    res
      .status(200)
      .json(
        { status: 200, message: 'bookstore created successfully' },
        bookstore
      );
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {bookId, name, location} = req.body;
    const bookstore = await prisma.bookStore.update({
      where: {
        id: Number(id),
      },
      data: {
        bookId,
        name,
        location,
      },
    });
    if (!bookstore) {
      return res.status(409).json('bookstore already exists');
    }

    res
      .status(200)
      .json(
        { status: 200, message: 'bookstore updated successfully' },
        bookstore
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bookstore = await prisma.bookStore.delete({
      where: {
        id: Number(id),
      },
    });
    if (!bookstore) {
      return res.status(409).json('bookstore not deleted');
    }
    res.json[bookstore];
    res.status(200).json({ status: 200, message: 'bookstore deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
