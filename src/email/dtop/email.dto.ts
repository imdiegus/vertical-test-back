export class CreateEmailDto {
  readonly to: string[]
  readonly message: string
  readonly time: string
  readonly from: string
  readonly subject: string
}
