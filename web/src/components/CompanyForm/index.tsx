import { Formik, Form, Field } from 'formik'
import { CnpjField, CurrencyField } from './maskedInput'
import { MdSave } from 'react-icons/md'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks'
import { http } from '@/services'
import { ANNUAL_INCOME_OPTIONS } from '@/types'
import styles from './styles.module.scss'

import type { Company, CompanyFormData } from '@/types'

type CompanyFormProps = {
  initialState?: Company
}

function CompanyForm({ initialState }: CompanyFormProps) {
  const router = useRouter()
  const toast = useToast()

  const isEditing = Boolean(initialState)
  const defaultValues: CompanyFormData = {
    annual_income: initialState?.annual_income ?? '',
    about: initialState?.about ?? '',
    name: initialState?.name ?? '',
    cnpj: initialState?.cnpj ?? '',
    demand: isEditing
      ? String(initialState.demand)
      : '',
  }

  async function handleSubmit(formData: CompanyFormData) {
    try {
      const httpMethod = isEditing ? 'patch' : 'post'
      const uri = `/companies${isEditing ? `/${initialState.id}` : ''}`
      const successMessage = isEditing
        ? 'Atualizado realizada com sucesso.'
        : 'Cadastro realizado com sucesso.'

      await http[httpMethod](uri, formData)
      toast.success(successMessage)
      router.replace('/companies')
    } catch (error) {
      Object.values(error.response.data.errors ?? {}).forEach((err) => {
        toast.error(err)
      })
    }
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
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Cadastro Nacional de Pessoa Jurídica (CNPJ):</label>
              <CnpjField name="cnpj" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Faturamento anual:</label>
              <Field as="select" name="annual_income">
                <option value="" disabled>Selecione...</option>
                {ANNUAL_INCOME_OPTIONS.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </Field>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Sobre a Empresa:</label>
              <Field as="textarea" name="about" rows="5" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="">Demanda:</label>
              <CurrencyField name="demand" />
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
