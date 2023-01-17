# Partie Front

## How to launch

https://projet-angular-frontend.herokuapp.com/

```bash
git clone https://github.com/PandaShad/angularFrontM1Miage2022_2023.git

npm install

ng serve --watch
```

## Login / Register

### AuthService:

Le AuthService comporte le logique de l'application quant à la gestion des enregistrements et des connexions. Tout d'abord il permet de checker si un utilisateur est connecté ou non: 
Pour cela on utilise un BehaviorSubject qui va tracké ce booléen:
```bash
private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
isLoggedIn$ = this._isLoggedIn$.asObservable();
```
Par défaut il est set à false, dans le constructor on va vérifier si il existe un token de connexion dans le local storage ou non. Si un token existe alors le BehaviourSubject change de valeur pour true, sinon il reste à false
```bash
this._isLoggedIn$.next(!!this.tokenService.getToken()); // les '!!' permettent de transformer la valeur en booleen: undefined = false, sinon = true;
```

C'est aussi aussi que les appels API pour gérer le signup, le login et le logOut sont réalisés:
```bash
signupUser(first_name: string, last_name: string, email: string, password: string): Observable<any> {
    const queryParams = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }
    return this.http.post<any>(`${this.uri}/register`, queryParams, this.httpOptions);
  }
```

Pour le Login on update le stream de BehaviourSubject

```bash
logIn(queryParams: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.uri}/login`, queryParams, this.httpOptions).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(true);
      })
    );
  }
```

Pour le logOut() on clear le local storage puis on update _isLoggedIn$

```bash
logOut(){
    this.tokenService.logout();
    return this.http.post<any>(`${this.uri}/logout`, this.httpOptions).pipe(
      tap((res: any) => {
        this._isLoggedIn$.next(false);
      })
    );
  }
```

#### Error Modal

Si l'utilisateur essaie de créer un compte avec un mail déjà existant ou si il se trompe de mdp pour se connecter, une Dialog Material apparait avec le message d'erreur.

### TokenStorageService:

Ce service permet entre autre de sauvegarder un token dans le local Storage, de récupérer un token dans le local Storage, de récupérer la date d'expiration, ou de clear totalement le local storage (cette dernière méthode sera utilisé pour gérer le logOut())


### Guards

Il existe deux guards, une pour les utilisateurs connectés et un pour les utilisateurs non connectés:

Avant toute chose l'utilisateur doit, soit se connecter, soit créer un compte ce sont les deux seules options possibles pour un utilisateur non connecté. Si un utilisateur non connecté essaie de se rendre sur une page dont seul les utilisateurs connectés ont le droit, il sera redirigé vers la page de login.
Ce comportement est géré grâce à un guard spécifique aux utilisateurs non connectés:
```bash
export class NotLoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        if(isLoggedIn){
          this.router.navigate(['assignements']);
        }
      }),
      map(isLoggedIn => !isLoggedIn)
    )
  }
}
```

A l'inverse un utilisateur connecté ne peut pas accéder à la page de login et à la page de register:
```bash
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        console.log('isLogged =>', isLoggedIn)
        if(!isLoggedIn) {
          this.router.navigate(['login']);
        }
      })
    )
  }
```
### Interceptor

On a aussi créer un HttpInterceptor afin de fournir le token authorization dans toute les requêtes http, comme certaines nécessite qu'il soit définit cela permet d'éviter qu'un utilisateur non connecté réalise des requêtes qu'il n'a pas le droit de faire
```bash
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem('auth-token');
    if(idToken) {
      const cloned = request.clone({
        headers: request.headers.set('authorization', idToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
```
Dans app.module.ts
```bash
providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
```

### Styling

Certaines variables globales pour le style Css sont définis dans _variables.scss, il existe aussi des styles globaux dans styles.scss ce qui permet d'éviter de réecrire le même css pour les buttons par exemple, il suffit juste de donner les bonnes classes dans les templates html

### Pagination et filtering / sorting

Comme préciser dans le ReadMe du backend, au départ le trie/filtre/pagination se faisait côté back. Nous avons changé d'avis et décidé d'utiliser le dataSource d'un MatTable plutot. Pour se faire on récupère tout les assignments en db à l'init de la page, et on crée une nouvealle MatTableDataSource contenant tout les Assignments. Il suffit alors de binder cette dataSource a la table Angular

```bash
ngOnInit(): void {
    this.assignementsService.getAssignements()
      .pipe(first())
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Assignement>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }
```

```bash
<table mat-table [dataSource]="dataSource" matSort matSortDisableClear>
```

Afin de gérer les filtres on utilise le champ filterPredicate de la dataSource

### Add-Assignment

Utilisation d'un Stepper Angular pour gérer l'ajout d'Assignement, la dernière Step affiche un résumé des choix de l'utilisateur. Quand on ajoute un assignment on peut seulement donner le nom, la matière, et la date de rendu. Le reste est remplis automatiquement avec le nom de l'utilisateur et des valeurs par défauts. Pour modifer ces valeurs il faut passer par le formulaire d'édition.

```bash
firstFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required])
  });
  secondFormGroup = new FormGroup({
    date: new FormControl('', [Validators.required]),
  });
```

La dernière Step récupère les informations de la matière selectionnée aussi grâce à un appel back getSubjectByName();

```bash
getSubjectDetails(subject: any): void {
    this.subjectService.getSubjectByName(subject)
      .pipe(first())
      .subscribe(res => {
        console.log(res);
        this.subject = res;
        this.subjectInfoLoaded = true;
      }) 
  }
```

### Assignements Details

Affichage des details de l'assignement avec une checkbox permettant d'update le status du devoir, bouton d'edition pour accéder à l'edition du devoir et bouton de suppression.
Affiche aussi les détails de la matière associé au devoir.

### Ui Elements

Création d'éléments UI comme des status-tag que l'on affiche dans le tableau des devoirs afin de montrer si le devoir est rendu ou non, et si il est en retard ou à rendre.

## Conclusion

Il y a encore pas mal de chose à découvrir dans le code que je n'ai pu préciser ici comme la gestion des FormGroup, bonne visite !

Il reste encore beaucoup de chose à améliorer et certaines idées n'ont pas eu le temps d'être implémenté. Cependant ce fut un projet enrichissant ( ayant plus l'habitude du backend ) et je regrette un peu de ne pas avoir accordé plus de temps pour terminé certains éléménts.
Je pense le continuer un petit peu de mon côté afin d'avoir un projet aboutis.
