import { COMMON_VARIABLES } from "@/utils/commonVariables";
import axiosInstance from '@/lib/axios';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  productName: string;
  message: string;
}

export const getTestimonials = (): Promise<Testimonial[]> => {
  return axiosInstance
    .get(`${baseApiUrl}/${COMMON_VARIABLES.feedbackRoute}`)
    .then((response) => response.data as Testimonial[]);
};
