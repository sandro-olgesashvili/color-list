import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ShareService } from '../service/share.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let loadingService = inject(ShareService);
  loadingService.setLoading(true);
  return next(req).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
};
