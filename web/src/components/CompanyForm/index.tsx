import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'
import { MdSave } from 'react-icons/md'
import { CnpjField } from './maskedInput'
import { numUtils } from '@/utils'
import { ANNUAL_INCOME_OPTIONS } from '@/types'
import styles from './styles.module.scss'

import type { Company, CompanyFormData } from '@/types'

type CompanyFormProps = {
  initialState?: Company
}

function CompanyForm({ initialState }: CompanyFormProps) {
  const router = useRouter()

  const isEditing = Boolean(initialState)
  const defaultValues: CompanyFormData = {
    annual_income: initialState?.annual_income ?? '',
    about: initialState?.about ?? '',
    name: initialState?.name ?? '',
    cnpj: initialState?.cnpj ?? '',
    demand: isEditing
      ? numUtils.displayAsBrazilian(initialState.demand)
      : '',
  }

  function handleSubmit(formData: CompanyFormData) {
    setTimeout(() => {
      console.log(formData)
      router.replace('/companies')
    }, 1000)
  }

  return (
    <div className={styles.pageWrapper}>
      <Formik
        initialValues={defaultValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={styles.formGroup}>
              <label htmlFor="">Razão Social:</label>
              <Field type="text" name="name" autoFocus />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Cadastro Nacional de Pessoa Jurídica (CNPJ):</label>
              <CnpjField name="cnpj" />
              <ErrorMessage name="cnpj" component="div" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Faturamento anual:</label>
              <Field as="select" name="annual_income">
                <option value="" disabled>Selecione...</option>
                {ANNUAL_INCOME_OPTIONS.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </Field>
              <ErrorMessage name="annual_income" component="div" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Sobre a Empresa:</label>
              <Field as="textarea" name="about" rows="5" />
              <ErrorMessage name="about" component="div" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Demanda:</label>
              <Field type="text" name="demand" />
              <ErrorMessage name="demand" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              <MdSave /> {isEditing ? 'Salvar Dados' : 'Cadastrar Empresa'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CompanyForm
