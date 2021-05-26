
export type PaginationMeta = {
  currPage: number
  itemsPerPage: number
  itemsCount: number
}

abstract class Resource<T> {
  public abstract render(entity: T): unknown
  public abstract renderMany(entities: T[]): unknown
  public abstract paginate(entities: T[], paginationMeta: PaginationMeta): unknown
}

export default Resource
