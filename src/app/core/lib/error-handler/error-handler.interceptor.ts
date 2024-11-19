import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'

export const errorHandlerInterceptor = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Observable<HttpEvent<any>> => {
  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
            break
          case 404:
            break
          default:
            throwError(error)
            break
        }
      }

      return throwError(error)
    }),
  )
}
