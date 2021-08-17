import PropTypes from 'prop-types'
import {
  Article,
  H2,
  Paragraph,
  RadioButton,
  RadioButtonGroup,
  Box
} from '@s-ui/documentation-library'
import PinInput from '../src/PinInput'
import PinInputField from '../src/PinInputField'
import {useState} from 'react'
import {SIZES} from '../src/config'

const ArticleSizes = ({className}) => {
  const [size, setSize] = useState()

  const onChangeHandler = (event, value) => {
    setSize(value)
  }

  return (
    <Article className={className}>
      <H2>Sizes</H2>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic cum earum
        nobis, deserunt voluptate labore illo, temporibus ex iure aliquam
        tempore accusamus, aliquid velit magni eius! A at molestias sunt!
      </Paragraph>
      <RadioButtonGroup value={size} onChange={onChangeHandler}>
        {[undefined, ...Object.values(SIZES)].map((sizeValue, key) => {
          return (
            <RadioButton
              checked={sizeValue === size}
              value={sizeValue}
              key={key}
              label={sizeValue || 'undefined'}
            />
          )
        })}
      </RadioButtonGroup>
      <br />
      <br />
      <Box
        outline
        style={{
          maxWidth: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <PinInput status="focus" size={size} defaultValue="827382">
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Box>
    </Article>
  )
}

ArticleSizes.propTypes = {
  className: PropTypes.string
}

export default ArticleSizes
