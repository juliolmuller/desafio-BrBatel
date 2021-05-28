import CurrencyInput from 'react-currency-input-field'
import MaskedInput from 'react-text-mask'
import { Field } from 'formik'

type MaskedFieldProps = {
  name: string
}

const cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

function CnpjField({ name }: MaskedFieldProps) {
  return (
    <Field name={name}>
      {({ field }) => (
        <MaskedInput
          mask={cnpjMask}
          {...field}
        />
      )}
    </Field>
  )
}

function CurrencyField({ name }: MaskedFieldProps) {
  return (
    <Field name={name}>
      {({ form }) => (
        <CurrencyInput
          name={name}
          allowNegativeValue={false}
          decimalSeparator=","
          groupSeparator="."
          prefix="R$ "
          onValueChange={(value, fieldName) => {
            form.setFieldValue(fieldName, value)
          }}
        />
      )}
    </Field>
  )
}

export { CnpjField, CurrencyField }
