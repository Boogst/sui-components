/*
 * Remember: YOUR COMPONENT IS DEFINED GLOBALLY
 * */

/* eslint react/jsx-no-undef:0 */
/* eslint no-undef:0 */

import ReactDOM from 'react-dom'

import chai, {expect} from 'chai'
import chaiDOM from 'chai-dom'

import * as pkg from '../src'
import * as customPropTypes from '../src/customPropTypes'
import {
  getMessageErrorNumber,
  getMessageErrorPositive,
  getMessageErrorInRange
} from '../src/customPropTypes/helpers'

import json from '../package.json'

chai.use(chaiDOM)

describe(json.name, () => {
  const {default: Component} = pkg
  const setup = setupEnvironment(Component)

  it('library should include defined exported elements', () => {
    // Given
    const library = pkg
    const libraryExportedMembers = ['default']

    // When
    const {default: MoleculePagination, ...others} = library

    // Then
    expect(Object.keys(library).length).to.equal(libraryExportedMembers.length)
    expect(Object.keys(library)).to.have.members(libraryExportedMembers)
    expect(Object.keys(others).length).to.equal(0)
  })

  describe(Component.displayName, () => {
    it('should render without crashing', () => {
      // Given
      const props = {
        totalPages: 25
      }

      // When
      const component = <Component {...props} />

      // Then
      const div = document.createElement('div')
      ReactDOM.render(component, div)
      ReactDOM.unmountComponentAtNode(div)
    })

    it('should NOT render null', () => {
      // Given
      const props = {
        totalPages: 25
      }

      // When
      const {container} = setup(props)

      // Then
      expect(container.innerHTML).to.be.a('string')
      expect(container.innerHTML).to.not.have.lengthOf(0)
    })

    it('should NOT extend classNames', () => {
      // Given
      const props = {
        className: 'extended-classNames'
      }
      const findSentence = str => string =>
        string.match(new RegExp(`S*${str}S*`))

      // When
      const {container} = setup(props)
      const findClassName = findSentence(props.className)

      // Then
      expect(findClassName(container.innerHTML)).to.be.null
    })
  })

  describe('customPropTypes', () => {
    it('library should include defined exported elements', () => {
      const library = customPropTypes
      const libraryExportedMembers = [
        'isValidPage',
        'isValidShowPages',
        'isValidTotalPages'
      ]

      // When
      const {
        isValidPage,
        isValidShowPages,
        isValidTotalPages,
        ...others
      } = library
      // Then
      expect(Object.keys(library).length).to.equal(
        libraryExportedMembers.length
      )
      expect(Object.keys(library)).to.have.members(libraryExportedMembers)
      expect(Object.keys(others).length).to.equal(0)
    })

    describe('isValidPage', () => {
      const propTypeChecker = customPropTypes.isValidPage
      const componentName = Component.displayName
      const propName = 'page'

      it('given undefined page should return null', () => {
        // given
        const props = {
          [propName]: undefined
        }
        // when

        // then
        expect(propTypeChecker(props, propName, componentName)).to.equal(null)
      })

      it("given page='value' (not a number) should return Error", () => {
        // given
        const props = {
          [propName]: 'value'
        }
        const expected = new Error(
          getMessageErrorNumber({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })

      it('given page=-1 (negative number) should return Error', () => {
        // given
        const props = {
          [propName]: -1
        }
        const expected = new Error(
          getMessageErrorPositive({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })

      it('given page=10 and totalPages=2 (out of range) should return Error', () => {
        // given
        const props = {
          [propName]: 10,
          totalPages: 2
        }
        const expected = new Error(
          getMessageErrorInRange({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })

      it('given page=1 and totalPages=2 (valid value in range) should return null', () => {
        // given
        const props = {
          [propName]: 1,
          totalPages: 2
        }
        const expected = null

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current).to.equal(expected)
      })
    })

    describe('isValidShowPages', () => {
      const propTypeChecker = customPropTypes.isValidShowPages
      const componentName = Component.displayName
      const propName = 'showPages'

      it('given undefined showPages should return null', () => {
        // given
        const props = {
          [propName]: undefined
        }
        // when

        // then
        expect(propTypeChecker(props, propName, componentName)).to.equal(null)
      })

      it("given showPages='value' (not a number) should return Error", () => {
        // given
        const props = {
          [propName]: 'value'
        }
        const expected = new Error(
          getMessageErrorNumber({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })

      it('given showPages=-1 (negative number) should return Error', () => {
        // given
        const props = {
          [propName]: -1
        }
        const expected = new Error(
          getMessageErrorPositive({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })

      it('given showPages=10 and totalPages=2 (out of range) should return Error', () => {
        // given
        const props = {
          [propName]: 10,
          totalPages: 2
        }
        const expected = new Error(
          getMessageErrorInRange({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })

      it('given showPages=1 and totalPages=2 (valid value in range) should return null', () => {
        // given
        const props = {
          [propName]: 1,
          totalPages: 2
        }
        const expected = null

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current).to.equal(expected)
      })
    })

    describe('isValidTotalPages', () => {
      const propTypeChecker = customPropTypes.isValidTotalPages
      const componentName = Component.displayName
      const propName = 'totalPages'
      it('given undefined totalPages should return null', () => {
        // given
        const props = {
          [propName]: undefined
        }
        // when

        // then
        expect(propTypeChecker(props, propName, componentName)).to.equal(null)
      })
      it("given totalPages='value' (not a number) should return Error", () => {
        // given
        const props = {
          [propName]: 'value'
        }
        const expected = new Error(
          getMessageErrorNumber({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })
      it('given totalPages=-1 (negative number) should return Error', () => {
        // given
        const props = {
          [propName]: -1
        }
        const expected = new Error(
          getMessageErrorPositive({propName, componentName})
        )

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current instanceof Error).to.equal(true)
        expect(current.message).to.equal(expected.message)
      })
      it('given totalPages=1 (valid value in range) should return null', () => {
        // given
        const props = {
          [propName]: 1
        }
        const expected = null

        // when
        const current = propTypeChecker(props, propName, componentName)
        // then
        expect(current).to.equal(expected)
      })
    })
  })
})
