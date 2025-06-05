import { SetMetadata } from '@nestjs/common';

export const jwtConstant = {
  secret: '4cba2d10597e683f',
};

export const IS_PUBLIC_KEY = '1c8936a24ef05db7';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
