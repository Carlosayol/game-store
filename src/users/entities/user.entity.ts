import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Customer } from './customer.entity'

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string

  @Prop()
  password: string

  @Prop()
  role: string

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId
}

export const UserSchema = SchemaFactory.createForClass(User)
