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

  @PrimaryGeneratedColumn('increment')
  public readonly id: number

  @Column()
  public name: string

  @Column()
  public cnpj: string

  @Column()
  public demand: number

  @Column()
  public annual_income: string

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
