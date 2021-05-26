/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { Company as CompanyModel } from '../../app/models'

export class CreateCompaniesTable1621797226082 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(new Table({
      name: CompanyModel.TABLE_NAME,
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'cnpj',
          type: 'char(14)',
        },
        {
          name: 'demand',
          type: 'numeric',
          precision: 14,
          scale: 4,
        },
        {
          name: 'annual_income',
          type: 'varchar',
        },
        {
          name: 'about',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'NOW()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'NOW()',
        },
        {
          name: 'deleted_at',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable(CompanyModel.TABLE_NAME)
  }
}
