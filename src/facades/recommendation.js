'use strict'

const brain = require('brain.js')
const {
  addBookUserView,
  getBookById,
  getBookUserViews,
  getBooks
} = require('./book')

const similarBooksNN = new brain.NeuralNetwork()

const rateBookCategories = (categories, score=1) => {
  return categories.reduce((ratings, category) => ({
    ...ratings,
    [category]: score
  }), {})
}

const trainSimilarBooksNN = () => {
  return getBooks()
    .then(books => {
      const dataSet = books.map(book => ({
        input: rateBookCategories(book.categories),
        output: { [book.id]: 1 }
      }))
      console.log('Books trained: ', similarBooksNN.train(dataSet))
    })
}

trainSimilarBooksNN()

const takeTop = (results, limitTo) => {
  return Object.keys(results)
    .map(id => ({
      id,
      score: results[id]
    }))
    .sort((r1, r2) => r1.score > r2.score ? -1 : r1.score < r2.score ? 1 : 0)
    .slice(0, limitTo)
}

const loadTopBooks = (results, limitTo) => {
  return Promise.all(
    takeTop(results || [], limitTo)
      .map(({ id }) => getBookById(id))
  )
}

exports.getSimilarBooks = (book) => {
  const input = rateBookCategories(book.categories)
  const results = similarBooksNN.run(input)
  delete results[book.id]
  // console.log('Books similar to:', input)
  // console.log('Books scored by similarity:', results)
  return loadTopBooks(results, 3)
}

const booksInspiredByUserViewsNN = new brain.NeuralNetwork()

const getAllBookCategories = () => {
  return getBooks()
    .then(books => books.reduce((categories, book) => ({
      ...categories,
      ...rateBookCategories(book.categories, 0),
    }), {}))
}

const trainBooksInspiredByUserViewsNN = () => {
  return Promise.all([
    getAllBookCategories(),
    getBookUserViews()
  ]).then(([ allBookCategories, views ]) => {
    if (!views.length) { return }
    const dataSet =  views.map(view => ({
      input: { [view.userId]: 1 },
      output: {
        ...allBookCategories,
        ...rateBookCategories(view.categories),
      },
    }))
    const trainingStats = booksInspiredByUserViewsNN.train(dataSet)
    console.log('Books inpired by user views trained: ', trainingStats)
  })
}

trainBooksInspiredByUserViewsNN()

exports.updateBooksInspiredByUserViews = (book, user) => {
  return addBookUserView(book, user)
    .then(trainBooksInspiredByUserViewsNN)
}

exports.getBooksInspiredByUserViews = (user) => {
  try {
    const userInspiredCategories = booksInspiredByUserViewsNN.run({ [user.id]: 1 })
    const results = similarBooksNN.run(userInspiredCategories || {})
    // console.log('User inspired categories: ', userInspiredCategories)
    // console.log('User inspired books: ', results)
    return loadTopBooks(results, 5)
  } catch (err) {
    return Promise.reject(err)
  }
}
