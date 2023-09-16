import express from 'express';
import prisma from './lib/index.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    if (books.length === 0) {
      return res.status(404).json({ status: 404, message: 'books not found' });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!book) {
      return res.status(404).json({ error: 'book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { authorId, title, price, image } = req.body;

    const book = await prisma.book.create({
      data: {
        authorId,
        title,
        price,
        image,
      },
    });

    if (!book) {
      return res
        .status(400)
        .json({ status: 400, message: 'book was not created!' });
    }

    res
      .status(200)
      .json({ status: 200, message: 'book successFully created!' }, book);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, title, price, image } = req.body;
    const book = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        authorId,
        title,
        price,
        image,
      },
    });
    if (!book) {
      return res.status(409).json('book already exists');
    }

    res
      .status(200)
      .json({ status: 200, message: 'book updated successfully' }, book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    if (!book) {
      return res.status(409).json('book already exists');
    }
    res.json[book];
    res
      .status(200)
      .json({ status: 200, message: 'book successFully deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
