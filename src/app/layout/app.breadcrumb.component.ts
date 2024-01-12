import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent {

    // BehaviorSubject to hold and emit breadcrumb data
    private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

    // Observable for external components to subscribe to breadcrumb changes
    readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

    constructor(private router: Router) {
        // Subscribe to router events to update breadcrumbs when navigation ends
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
            // Get the root of the current router state
            const root = this.router.routerState.snapshot.root;
            const breadcrumbs: Breadcrumb[] = [];
            
            // Generate breadcrumbs recursively by traversing the route tree
            this.addBreadcrumb(root, [], breadcrumbs);

            // Emit the updated breadcrumbs to subscribers
            this._breadcrumbs$.next(breadcrumbs);
        });
    }

    // Recursive function to build breadcrumbs based on route data
    private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
        // Construct the route URL by concatenating parent URLs with current route's path
        const routeUrl = parentUrl.concat(route.url.map(url => url.path));
        
        // Get the breadcrumb data from the route
        const breadcrumb = route.data['breadcrumb'];
        const parentBreadcrumb = route.parent && route.parent.data ? route.parent.data['breadcrumb'] : null;

        // Check if the route has a breadcrumb and it's different from the parent's breadcrumb
        if (breadcrumb && breadcrumb !== parentBreadcrumb) {
            breadcrumbs.push({
                label: route.data['breadcrumb'],
                url: '/' + routeUrl.join('/')
            });
        }

        // Recursively process child routes
        if (route.firstChild) {
            this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
        }
    }
}
