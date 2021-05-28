import { Field } from 'formik'
import MaskedInput from 'react-text-mask'

type CnpjFieldProps = {
  name: string
}

const cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

function CnpjField({ name }: CnpjFieldProps) {
  return (
    <Field
      type="text"
      name={name}
    >
      {({ field }) => (
        <MaskedInput mask={cnpjMask} {...field} />
      )}
    </Field>
  )
}

export { CnpjField }
