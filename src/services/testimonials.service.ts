import { COMMON_VARIABLES } from "@/utils/commonVariables";
import axios from '@/lib/axios';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  productName: string;
  message: string;
}

export const getTestimonials = (): Promise<Testimonial[]> => {
  return axios
    .get(`${baseApiUrl}/${COMMON_VARIABLES.feedbackRoute}`)
    .then((response) => response.data as Testimonial[]);
};
