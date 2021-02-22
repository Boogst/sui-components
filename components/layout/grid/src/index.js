import PropTypes from 'prop-types'
import LayoutGridItem from './gridItem'
import cx from 'classnames'

import {
  ALIGN_ITEMS,
  BASE_CLASS,
  JUSTIFY_CONTENT,
  GUTTER_VALUES,
  BREAKPOINTS
} from './settings'

const transition = ({isGapless, ...oldProps}) => {
  const gutter = oldProps.gutter || isGapless ? 0 : undefined
  return {gutter, ...oldProps}
}

const getGutterClassNames = (gutterConfig = {}) => {
  if (GUTTER_VALUES.includes(gutterConfig)) {
    return `${BASE_CLASS}--gutter-${BREAKPOINTS.XXS}-${gutterConfig}`
  } else if (typeof gutterConfig === 'object') {
    return Object.entries(gutterConfig)
      .map(([key, value]) =>
        Object.values(BREAKPOINTS).includes(key)
          ? `${BASE_CLASS}--gutter-${key}-${value}`
          : null
      )
      .filter(value => value !== null)
      .join(' ')
  }
  return null
}

function LayoutGrid(props) {
  const {alignItems, children, justifyContent, gutter} = transition(props)
  const classNames = cx(
    `${BASE_CLASS}`,
    alignItems && `${BASE_CLASS}--ai-${alignItems}`,
    justifyContent && `${BASE_CLASS}--jc-${justifyContent}`,
    getGutterClassNames(gutter)
  )

  return <div className={classNames}>{children}</div>
}

LayoutGrid.displayName = 'LayoutGrid'

LayoutGrid.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Sets the align-self value on all direct children as a group. It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf(Object.values(ALIGN_ITEMS)),
  /**
   * Distribute space between and around content items. It's applied for all screen sizes.
   */
  justifyContent: PropTypes.oneOf(Object.values(JUSTIFY_CONTENT)),
  /**
   * Removes items padding. (Deprecated)
   */
  isGapless: PropTypes.bool,
  /***
   * Spacing between cells.
   */
  gutter: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(GUTTER_VALUES)),
    PropTypes.objectOf(PropTypes.oneOf(Object.values(GUTTER_VALUES)))
  ])
}

export default LayoutGrid

export {
  LayoutGridItem,
  ALIGN_ITEMS as LayoutGridAlignItems,
  JUSTIFY_CONTENT as LayoutGridJustifyContent,
  GUTTER_VALUES as LayoutGridGutterValues,
  BREAKPOINTS as LayoutGridBreakpoints
}
