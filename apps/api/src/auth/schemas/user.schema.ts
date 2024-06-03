import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ default: 'user' })
  name: string;

  @Prop({
    unique: [true, 'Error validating credentials, please contact support.'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  google_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
