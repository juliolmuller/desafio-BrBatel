import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

const TABLE_NAME = 'companies'

@Entity(TABLE_NAME)
class Company {
  public static readonly TABLE_NAME = TABLE_NAME
  public static readonly ANNUAL_INCOME_OPTIONS = [
    'Até R$10 milhões',
    'De R$10 a R$50 milhões',
    'De R$50 a R$200 milhões',
    'De R$200 a R$500 milhões',
    'Acima de R$500 milhões',
  ] as const

  @PrimaryGeneratedColumn('increment')
  public readonly id: number

  @Column()
  public name: string

  @Column()
  public cnpj: string

  @Column()
  public demand: number

  @Column()
  public annual_income: typeof Company.ANNUAL_INCOME_OPTIONS[number]

  @Column()
  public about?: string

  @CreateDateColumn()
  public readonly created_at: Date

  @UpdateDateColumn()
  public readonly updated_at: Date

  @DeleteDateColumn()
  public readonly deleted_at: Date
}

export default Company
