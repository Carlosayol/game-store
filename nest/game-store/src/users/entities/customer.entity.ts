import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Customer extends Document {
  @Prop()
  name: string

  @Prop()
  lastName: string

  @Prop()
  phone: string

  @Prop({
    type: [{ name: { type: String }, priority: { type: String } }],
  })
  preferences: Types.Array<Record<string, any>>
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
