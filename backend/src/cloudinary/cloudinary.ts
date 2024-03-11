import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): void => {
    v2.config({
      cloud_name: 'dkjzkg5mk',
      api_key: '971952143827734',
      api_secret: 'spdrpZO82Qtu5_S6ICq7QSMgEXk',
    });
  },
};


