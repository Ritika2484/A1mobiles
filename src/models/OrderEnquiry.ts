import mongoose, { Schema, Model, Document } from 'mongoose';
import { randomUUID } from 'crypto';

export type OrderEnquiryStatus = 'pending' | 'contacted' | 'confirmed' | 'cancelled';

export interface IOrderEnquiry {
  _id: string;
  productId: string;
  quantity: number;
  priceSnapshot: number;
  status: OrderEnquiryStatus;
  whatsappUrl?: string | null;
  customerNote?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderEnquiryDocument extends Omit<IOrderEnquiry, '_id'>, Document<string> {
  id: string;
  product?: {
    name: string;
    slug?: string;
    imageUrl?: string | null;
  };
}

const OrderEnquirySchema = new Schema<IOrderEnquiryDocument>(
  {
    _id: {
      type: String,
      default: () => randomUUID(),
    },
    productId: {
      type: String,
      required: [true, 'Product ID reference is required'],
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, 'Quantity must be at least 1'],
      max: [99, 'Quantity cannot exceed 99'],
    },
    priceSnapshot: {
      type: Number,
      required: [true, 'Price snapshot is required'],
      min: [0, 'Price must be non-negative'],
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'contacted', 'confirmed', 'cancelled'],
        message: '{VALUE} is not a valid enquiry status',
      },
      default: 'pending',
    },
    whatsappUrl: {
      type: String,
      default: null,
    },
    customerNote: {
      type: String,
      default: null,
    },
  },
  {
    collection: 'order_enquiries',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Virtual reference to Product model matching Prisma relation
OrderEnquirySchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

OrderEnquirySchema.index({ status: 1 });
OrderEnquirySchema.index({ productId: 1 });
OrderEnquirySchema.index({ createdAt: -1 });

export const OrderEnquiry: Model<IOrderEnquiryDocument> =
  mongoose.models.OrderEnquiry || mongoose.model<IOrderEnquiryDocument>('OrderEnquiry', OrderEnquirySchema);

export default OrderEnquiry;
