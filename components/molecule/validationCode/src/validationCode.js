import PropTypes from 'prop-types'
import PinInput, {getPinInputValueType} from '@s-ui/react-atom-pin-input'
import AtomButton, {atomButtonDesigns} from '@s-ui/react-atom-button'
import ValidationText from '@s-ui/react-atom-validation-text'
import {
  validationCodeStatus,
  validationCodeSizes,
  validationCodeMask
} from './config'
import useControlledState from '@s-ui/react-hooks/lib/useControlledState'
import {forwardRef, useMemo} from 'react'

const normalizeValue = value => {
  if (value === undefined) {
    return value
  }
  const result = `${typeof value === 'string' ? value.split('') : value}`
  return result
}

const baseClass = 'sui-MoleculeValidationCode'
const MoleculeValidationCode = forwardRef(
  (
    {
      labelText,
      deleteButtonText,
      sendButtonText,
      resendButtonText,
      value,
      defaultValue = '',
      onClear,
      onChange,
      onSend,
      onResend,
      size,
      isPassword,
      status,
      statusMessage,
      placeholder,
      length = 6,
      mask,
      disabled
    },
    forwardedRef
  ) => {
    const [innerValue, setInnerValue] = useControlledState(
      normalizeValue(value),
      normalizeValue(defaultValue)
    )

    const arrayInnerValue =
      innerValue.length > 0 ? innerValue.split(',') : innerValue

    const valueType = useMemo(
      () => getPinInputValueType({value, defaultValue}),
      [value, defaultValue]
    )

    const onChangeHandler = (event, args) => {
      setInnerValue(`${args.innerValue}`)
      typeof onChange === 'function' &&
        onChange(event, {
          ...args,
          value:
            valueType === 'string' ? args.innerValue.join('') : args.innerValue
        })
    }

    const onClearHandler = event => {
      setInnerValue('')
      typeof onClear === 'function' && onClear(event)
      typeof onChange === 'function' &&
        onChange(event, {value: '', innerValue: []})
    }

    const onHandler = handler => {
      return handler
        ? event => {
            handler(event, {
              value:
                valueType === 'string'
                  ? arrayInnerValue.filter(Boolean).join('')
                  : arrayInnerValue
            })
          }
        : undefined
    }

    return (
      <div className={baseClass}>
        <div className={`${baseClass}-header`}>
          <p className={`${baseClass}-header-labelTitle`}>{labelText}</p>
          <AtomButton onClick={onClearHandler} design={atomButtonDesigns.FLAT}>
            {deleteButtonText}
          </AtomButton>
        </div>
        <div className={`${baseClass}-inputContainer`}>
          <div className={`${baseClass}-inputContainer-pinInput`}>
            <PinInput
              length={length}
              onChange={onChangeHandler}
              value={arrayInnerValue}
              status={status}
              ref={forwardedRef}
              placeholder={placeholder}
              isPassword={isPassword}
              size={size}
              mask={mask}
              disabled={disabled}
            />
            {statusMessage !== undefined && (
              <ValidationText text={statusMessage} type={status} />
            )}
          </div>
        </div>
        <div className={`${baseClass}-footer`}>
          <AtomButton fullWidth onClick={onHandler(onSend)}>
            {sendButtonText}
          </AtomButton>
          <AtomButton
            fullWidth
            design={atomButtonDesigns.FLAT}
            onClick={onHandler(onResend)}
          >
            {resendButtonText}
          </AtomButton>
        </div>
      </div>
    )
  }
)

MoleculeValidationCode.displayName = 'MoleculeValidationCode'
MoleculeValidationCode.propTypes = {
  /** text on the label */
  labelText: PropTypes.string,
  /** text on delete button */
  deleteButtonText: PropTypes.string,
  /** text on send button  */
  sendButtonText: PropTypes.string,
  /** text on resend button */
  resendButtonText: PropTypes.string,
  /** message shown on status */
  statusMessage: PropTypes.string,
  /** function to be called when user presses clear button */
  onClear: PropTypes.func,
  /** default value for the input */
  defaultValue: PropTypes.string,
  /** true for disabled false for default */
  disabled: PropTypes.bool,
  /** true to make the input type password false for text */
  isPassword: PropTypes.bool,
  /** defines the number of cells */
  length: PropTypes.number,
  /** name of the custom mask (NUMBER, ALPHABETIC, ALPHANUMERIC) */
  mask: PropTypes.oneOf(Object.values(validationCodeMask)),
  /** function executed on value change */
  onChange: PropTypes.func,
  /** function executed on pressing sending button */
  onSend: PropTypes.func,
  /** function executed on pressing re-sending button */
  onResend: PropTypes.func,
  /** placeholder for the input */
  placeholder: PropTypes.string,
  /** set the size of the input (XXSMALL, XSMALL, SMALL, MEDIUM, LARGE, XLARGE, XXLARGE) */
  size: PropTypes.oneOf(Object.values(validationCodeSizes)),
  /** set the input status (ERROR, SUCCESS, WARNING) */
  status: PropTypes.oneOf(Object.values(validationCodeStatus)),
  /** input value */
  value: PropTypes.string
}

export default MoleculeValidationCode
