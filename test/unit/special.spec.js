/* global describe, it */
import { expect } from 'chai'
import { transformPathToString, transformRawToArgs, transformWildCardsToArgs } from '../../lib/special.js'

describe('Specification: special.js', function () {
  it('should works with the `$raw` special switch', function () {
    const r = transformRawToArgs({
      $raw: ['-i!*.jpg', '-i!*.png', '-r0']
    })
    expect(r).to.contain('-i!*.jpg')
    expect(r).to.contain('-i!*.png')
    expect(r).to.contain('-r0')
  })

  it('should not err with `$raw` special switch', function () {
    const r = transformRawToArgs({})
    /* eslint-disable no-unused-expressions */
    expect(r).to.be.an('array').that.is.empty
    /* eslint-enable no-unused-expressions */
  })

  it('should works with the `$wildcards` special switch', function () {
    const r = transformWildCardsToArgs({
      $wildcards: ['*.jpg', '*.png']
    })
    expect(r).to.contain('*.jpg')
    expect(r).to.contain('*.png')
  })

  it('should not err with the `$wildcards` special switch', function () {
    const r = transformWildCardsToArgs({})
    /* eslint-disable no-unused-expressions */
    expect(r).to.be.an('array').that.is.empty
    /* eslint-enable no-unused-expressions */
  })

  it('should use custom $path when specified', function () {
    const r = transformPathToString({
      $path: './node_modules/.bin/7z'
    })
    expect(r).to.equals('./node_modules/.bin/7z')
  })

  it('should fallback to deflaut if $path not specified', function () {
    const r = transformPathToString({})
    expect(r).to.equals('7za')
  })
})