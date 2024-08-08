import { inject } from '@angular/core';
import { AppWidthService } from '@core/services/app-width.service';
import { DESKTOP_BREAKPOINT } from '@core/shared/constants';

export const widthGuard = () => {
  const widthService = inject(AppWidthService);

  return widthService.width() < DESKTOP_BREAKPOINT;
};
