import mongoose, { Schema, Model, Document } from 'mongoose';
import { randomUUID } from 'crypto';

export interface IProduct {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  inStock: boolean;
  isActive: boolean;
  featured: boolean;
  tag?: string | null;
  images?: string[];
  colors?: { name: string; hex: string }[];
  storageOptions?: string[];
  specifications?: Record<string, string>;
  features?: string[];
  sourceUrl?: string | null;
  verificationDate?: string | null;
  verificationStatus?: 'verified' | 'unverified' | 'needs-review';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductDocument extends Omit<IProduct, '_id'>, Document<string> {
  id: string;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    _id: {
      type: String,
      default: () => randomUUID(),
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be non-negative'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Original price is required'],
      min: [0, 'Original price must be non-negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be less than 0%'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    imagePublicId: {
      type: String,
      default: null,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: null,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    colors: {
      type: [
        {
          name: { type: String, required: true },
          hex: { type: String, required: true },
        },
      ],
      default: [],
    },
    storageOptions: {
      type: [String],
      default: [],
    },
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    features: {
      type: [String],
      default: [],
    },
    sourceUrl: {
      type: String,
      default: null,
    },
    verificationDate: {
      type: String,
      default: null,
    },
    verificationStatus: {
      type: String,
      enum: ['verified', 'unverified', 'needs-review'],
      default: 'verified',
    },
  },
  {
    collection: 'products',
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

// Compound and search indexes matching PostgreSQL query patterns
ProductSchema.index({ isActive: 1, category: 1 });
ProductSchema.index({ isActive: 1, inStock: 1 });
ProductSchema.index({ featured: -1, createdAt: -1 });

export const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>('Product', ProductSchema);

export default Product;
