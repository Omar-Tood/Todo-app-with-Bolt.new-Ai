'use client';

import { Toast, ToastActionElement, ToastProps } from '@/components/ui/toast';
import {
  useToast as useToastImpl,
  type ToastActionElement as ToastActionElementType,
} from '@/components/ui/toast';

export type { Toast, ToastActionElement, ToastProps };

export const useToast = useToastImpl;