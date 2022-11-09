export class CreateProductDto {
  readonly name: string
  readonly description: string
  readonly price: number
  readonly stock: number
  readonly image: string
}

export class UpdateProductDto {
  readonly id: string
  readonly name?: string
  readonly description?: string
  readonly price?: number
  readonly stock?: number
  readonly image?: string
}
