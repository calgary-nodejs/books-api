'use strict'

const brain = require('brain.js')
const {
  getBookById,
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

exports.getSimilarBooks = (book) => {
  const input = rateBookCategories(book.categories)
  const result = similarBooksNN.run(input)
  delete result[book.id]
  // console.log('Books similar to:', input)
  // console.log('Books scored by similarity:', result)
  return Promise.all(
    takeTop(result, 3)
      .map(({ id }) => getBookById(id))
  )
}
