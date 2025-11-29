import { useContext } from 'react';
import { useToast as useToastContext } from '../components/common/ToastProvider';

export default function useToast() {
  return useToastContext();
}
