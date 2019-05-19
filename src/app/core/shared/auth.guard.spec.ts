import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });
  /*
    it('should create', inject([AuthGuard], (guard: AuthGuard) => {
      expect(guard).toBeTruthy();
    }));*/
});

/*
(private auth: AuthService,
              private router: Router)
 */
